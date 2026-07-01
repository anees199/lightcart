let products = [];
let categories = [];
let currentUser = null;
let cartState = { items: [], summary: { count: 0 } };
let wishlistState = { items: [] };

const testimonials = [
  ["Maya R.", "LightCart feels fast and polished. I found a sale bundle in two taps."],
  ["Jordan P.", "The product cards, filters, and quick view make browsing genuinely easy."],
  ["Selena K.", "Premium look without friction. The wishlist to cart flow is excellent."]
];

const faqs = [
  ["How do LightCart deals work?", "Discounts are shown on each product card with the original price, sale price, and badge."],
  ["Can I save products for later?", "Yes. Sign in, use the wishlist button on any product card, then move saved products to cart."],
  ["Is checkout connected?", "Yes. Checkout creates an order, updates stock, and clears your cart."],
  ["Does the website support dark mode?", "Yes. The theme toggle stores your preference locally and applies it across pages."],
  ["How do filters and sorting work?", "Products can be filtered by category, price, and text, then sorted by price or rating."]
];

const money = value => `$${Number(value || 0).toFixed(2)}`;
const getStore = key => JSON.parse(localStorage.getItem(key) || "[]");
const setStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uniqueProducts = list => {
  const seen = new Set();
  return list.filter(product => {
    const key = `${product.category_slug || product.category}:${product.name}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

async function bootstrapData() {
  const [me, categoryData, productData] = await Promise.all([
    api("/api/auth/me"),
    api("/api/categories"),
    api("/api/products")
  ]);
  currentUser = me.user;
  categories = categoryData.categories;
  products = uniqueProducts(productData.products);
  if (currentUser) {
    [cartState, wishlistState] = await Promise.all([api("/api/cart"), api("/api/wishlist")]);
  }
}

function requireLogin() {
  if (currentUser) return true;
  toast("Please log in first.");
  setTimeout(() => location.href = "login.html", 650);
  return false;
}

function initShell() {
  document.querySelectorAll(".site-header:empty").forEach(header => {
    header.innerHTML = `
      <nav class="navbar" aria-label="Primary navigation">
        <a href="index.html" class="brand" aria-label="LightCart home"><span>Light</span>Cart</a>
        <button class="icon-button menu-toggle" aria-label="Open menu">Menu</button>
        <form class="search-form" role="search">
          <input type="search" id="globalSearch" placeholder="Search phones, shoes, lamps..." aria-label="Search products">
          <button type="submit">Search</button>
          <div class="suggestions" aria-label="Search suggestions"></div>
        </form>
        <div class="nav-actions">
          <button class="icon-button theme-toggle" aria-label="Toggle dark mode">DM</button>
          <a href="wishlist.html" class="nav-pill">W <span>Wishlist</span></a>
          <a href="cart.html" class="nav-pill cart-link">C <span>Cart</span><b class="cart-count">0</b></a>
        </div>
        <div class="nav-links">
          <a href="products.html">Products</a><a href="categories.html">Categories</a><a href="search.html">Search</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="faq.html">FAQ</a>
        </div>
        <div class="mega-menu">${categories.slice(0, 5).map(c => `<a href="categories.html#${c.slug}">${c.name}</a>`).join("")}</div>
      </nav>`;
  });

  document.querySelectorAll(".site-footer").forEach(footer => {
    footer.innerHTML = `
      <div class="footer-inner">
        <div><h3 class="brand"><span>Light</span>Cart</h3><p>Premium marketplace with responsive shopping flows and Flask-backed checkout.</p></div>
        <div><h4>Shop</h4><a href="products.html">Products</a><a href="categories.html">Categories</a><a href="wishlist.html">Wishlist</a><a href="cart.html">Cart</a></div>
        <div><h4>Account</h4><a href="login.html">Login</a><a href="signup.html">Signup</a><a href="faq.html">FAQ</a></div>
        <div><h4>Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="#">LinkedIn</a></div>
      </div>`;
  });
}

function renderAuthNav() {
  document.querySelectorAll(".nav-actions").forEach(actions => {
    if (actions.querySelector("[data-auth-action]")) return;
    const auth = document.createElement(currentUser ? "button" : "a");
    auth.className = "nav-pill";
    auth.dataset.authAction = currentUser ? "logout" : "login";
    auth.textContent = currentUser ? "Logout" : "Login";
    if (!currentUser) auth.href = "login.html";
    actions.appendChild(auth);
  });
}

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-media" href="product.html?id=${product.id}" aria-label="View ${product.name}">
        <span class="badge">${product.badge}</span>
        <img src="${product.img}" alt="${product.name}" loading="lazy">
      </a>
      <div class="card-actions">
        <button class="icon-button" data-wishlist="${product.id}" aria-label="Add ${product.name} to wishlist" title="Save">Save</button>
        <button class="icon-button" data-quick="${product.id}" aria-label="Quick view ${product.name}" title="Quick view">Quick</button>
      </div>
      <div class="product-info">
        <p class="meta">${product.category} / ${product.brand}</p>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="rating">Rating ${product.rating} <span class="meta">(${product.reviews})</span></div>
        <div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.old)}</span></div>
        <div class="product-buttons">
          <button class="button primary" data-cart="${product.id}">Add to Cart</button>
          <button class="icon-button" data-compare="${product.id}" aria-label="Compare ${product.name}" title="Compare">Compare</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(target, list) {
  if (!target) return;
  const uniqueList = uniqueProducts(list);
  target.innerHTML = uniqueList.length ? uniqueList.map(productCard).join("") : `<div class="empty-state">No products found.</div>`;
}

function renderHomeSections() {
  const used = new Set();
  const pick = (list, count) => {
    const chosen = [];
    uniqueProducts(list).forEach(product => {
      if (chosen.length >= count || used.has(product.id)) return;
      used.add(product.id);
      chosen.push(product);
    });
    uniqueProducts(products).forEach(product => {
      if (chosen.length >= count || used.has(product.id)) return;
      used.add(product.id);
      chosen.push(product);
    });
    return chosen;
  };
  const currentId = Number(new URLSearchParams(location.search).get("id") || 0);
  const current = products.find(p => p.id === currentId);
  const sections = {
    featured: pick(products.filter(p => p.tags.includes("featured")), 4),
    trending: pick(products.filter(p => p.tags.includes("trending")), 10),
    bestsellers: pick(products.filter(p => p.tags.includes("bestseller")), 4),
    recommended: pick(products.filter(p => p.tags.includes("recommended")), 2),
    related: uniqueProducts(
      current
        ? products.filter(p => p.category === current.category && p.id !== current.id)
        : products
    ).slice(0, 8)
  };
  document.querySelectorAll("[data-product-section]").forEach(el => renderProducts(el, sections[el.dataset.productSection] || uniqueProducts(products).slice(0, 4)));
}

function renderCategories() {
  document.querySelectorAll("[data-categories]").forEach(el => {
    el.innerHTML = categories.map(category => `<a id="${category.slug}" class="category-card" href="products.html?category=${encodeURIComponent(category.name)}" style="background-image:url('${category.image}')"><div><p class="eyebrow">${category.product_count} deals</p><h3>${category.name}</h3></div></a>`).join("");
  });
}

function setupCatalog() {
  const grid = document.querySelector("#productsGrid");
  if (!grid) return;
  const categoryFilter = document.querySelector("#categoryFilter");
  const sort = document.querySelector("#sortProducts");
  const search = document.querySelector("#productSearch") || document.querySelector("#smartSearchInput");
  const price = document.querySelector("#priceFilter");
  const priceValue = document.querySelector("#priceValue");
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "all";
  const initialQuery = params.get("q") || "";

  if (categoryFilter) {
    categories.forEach(category => categoryFilter.insertAdjacentHTML("beforeend", `<option value="${category.name}">${category.name}</option>`));
    categoryFilter.value = initialCategory;
  }
  if (search) search.value = initialQuery;

  const skeleton = document.querySelector("[data-skeleton]");
  if (skeleton) {
    skeleton.innerHTML = Array.from({ length: 8 }, () => `<div class="skeleton"></div>`).join("");
    skeleton.classList.add("active");
  }

  function apply() {
    let list = uniqueProducts(products);
    const q = (search?.value || "").toLowerCase();
    const cat = categoryFilter?.value || "all";
    const max = Number(price?.value || 9999);
    if (q) list = list.filter(p => `${p.name} ${p.category} ${p.brand} ${p.tags.join(" ")}`.toLowerCase().includes(q));
    if (cat !== "all") list = list.filter(p => p.category === cat);
    list = list.filter(p => p.price <= max);
    if (sort?.value === "low") list.sort((a, b) => a.price - b.price);
    if (sort?.value === "high") list.sort((a, b) => b.price - a.price);
    if (sort?.value === "rating") list.sort((a, b) => b.rating - a.rating);
    if (priceValue) priceValue.textContent = `$${max}`;
    if (skeleton) {
      setTimeout(() => {
        skeleton.classList.remove("active");
        renderProducts(grid, list);
      }, 250);
    } else {
      renderProducts(grid, list);
    }
  }

  [categoryFilter, sort, search, price].forEach(el => el?.addEventListener("input", apply));
  document.querySelector("#smartSearch")?.addEventListener("submit", e => { e.preventDefault(); apply(); });
  apply();
}

async function addToCart(id) {
  if (!requireLogin()) return;
  cartState = await api("/api/cart", { method: "POST", body: JSON.stringify({ product_id: id, quantity: 1 }) });
  updateCartCount();
  renderCart();
  toast("Added to cart");
}

async function toggleWishlist(id) {
  if (!requireLogin()) return;
  wishlistState = await api("/api/wishlist", { method: "POST", body: JSON.stringify({ product_id: id }) });
  renderWishlist();
  toast("Wishlist updated");
}

function updateCartCount() {
  const count = cartState.summary?.count || 0;
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
}

function renderCart() {
  const wrap = document.querySelector("#cartItems");
  const summary = document.querySelector("#cartSummary");
  if (!wrap || !summary) return;
  if (!currentUser) {
    wrap.innerHTML = `<div class="empty-state">Please log in to view your cart.</div>`;
    summary.innerHTML = `<h2>Summary</h2><a class="button primary" href="login.html" style="width:100%">Login</a>`;
    return;
  }
  const items = cartState.items || [];
  if (!items.length) {
    wrap.innerHTML = `<div class="empty-state">Your cart is empty.</div>`;
    summary.innerHTML = `<h2>Summary</h2><p class="meta">Add products to see totals.</p>`;
    return;
  }
  wrap.innerHTML = items.map(item => `
    <article class="cart-line">
      <img src="${item.product.img}" alt="${item.product.name}">
      <div><h3>${item.product.name}</h3><p class="meta">${item.product.category}</p><div class="qty"><button data-qty="${item.product.id}" data-step="-1">-</button><span>${item.quantity}</span><button data-qty="${item.product.id}" data-step="1">+</button></div></div>
      <div><strong>${money(item.product.price * item.quantity)}</strong><button class="button ghost" data-remove="${item.product.id}">Remove</button></div>
    </article>`).join("");
  const totals = cartState.summary;
  summary.innerHTML = `<h2>Cart Summary</h2><div class="summary-row"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-row"><span>Discount</span><strong>-${money(totals.discount)}</strong></div><div class="summary-row"><span>Shipping</span><strong>${totals.shipping ? money(totals.shipping) : "Free"}</strong></div><div class="summary-row total"><span>Estimated Total</span><strong>${money(totals.total)}</strong></div><button class="button primary" data-checkout style="width:100%">Checkout</button>`;
}

function renderWishlist() {
  const grid = document.querySelector("#wishlistGrid");
  if (!grid) return;
  if (!currentUser) {
    grid.innerHTML = `<div class="empty-state">Please log in to view your wishlist.</div>`;
    return;
  }
  const list = uniqueProducts((wishlistState.items || []).map(item => item.product));
  renderProducts(grid, list);
  if (!list.length) grid.innerHTML = `<div class="empty-state">Your wishlist is empty.</div>`;
}

function renderDetail() {
  const el = document.querySelector("#productDetail");
  if (!el) return;
  const id = Number(new URLSearchParams(location.search).get("id") || 1);
  const product = products.find(p => p.id === id) || products[0];
  if (!product) return;
  const recent = getStore("lightcart_recent").filter(item => item !== product.id);
  setStore("lightcart_recent", [product.id, ...recent].slice(0, 6));
  const gallery = product.images?.length ? product.images : [product.img];
  el.innerHTML = `
    <div class="gallery">
      <div class="gallery-main"><img id="zoomImage" src="${product.img}" alt="${product.name}"></div>
      <div class="thumbs">${gallery.map(img => `<button data-thumb="${img}"><img src="${img}" alt=""></button>`).join("")}</div>
    </div>
    <div class="detail-panel">
      <p class="eyebrow">${product.category}</p><h1>${product.name}</h1><div class="rating">Rating ${product.rating} <span class="meta">${product.reviews} reviews</span></div>
      <div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.old)}</span><span class="badge" style="position:static">${product.badge}</span></div>
      <p>${product.description}</p>
      <ul class="specs"><li>Brand: ${product.brand}</li><li>Stock available: ${product.stock}</li><li>30-day return support</li><li>Verified LightCart marketplace seller</li></ul>
      <div class="hero-actions"><button class="button primary" data-cart="${product.id}">Add to Cart</button><button class="button ghost" data-wishlist="${product.id}">Save Favorite</button></div>
      <div class="review"><strong>Customer review</strong><p class="meta">"Premium feel, quick delivery, and exactly as shown."</p></div>
    </div>`;
  renderProducts(document.querySelector("[data-bundle]"), [product, ...uniqueProducts(products.filter(p => p.category === product.category && p.id !== product.id)).slice(0, 1)]);
}

function renderRecentlyViewed() {
  const el = document.querySelector("[data-recently-viewed]");
  if (!el) return;
  renderProducts(el, uniqueProducts(products.filter(p => getStore("lightcart_recent").includes(p.id))).slice(0, 6));
}

function quickView(id) {
  const dialog = document.querySelector("#quickView");
  const product = products.find(p => p.id === id);
  if (!dialog || !product) return;
  dialog.innerHTML = `<div class="dialog-grid"><img src="${product.img}" alt="${product.name}"><div><button class="icon-button" onclick="this.closest('dialog').close()" aria-label="Close">x</button><p class="eyebrow">${product.category}</p><h2>${product.name}</h2><p class="rating">Rating ${product.rating} (${product.reviews})</p><p class="price">${money(product.price)}</p><p class="meta">${product.description}</p><button class="button primary" data-cart="${product.id}">Add to Cart</button></div></div>`;
  dialog.showModal();
}

function compareDialog() {
  const dialog = document.querySelector("#compareDialog");
  if (!dialog) return;
  const selected = getStore("lightcart_compare").slice(-3);
  const list = uniqueProducts(products.filter(p => selected.includes(p.id)));
  dialog.innerHTML = `<button class="icon-button" onclick="this.closest('dialog').close()" aria-label="Close">x</button><h2>Product Comparison</h2><div class="product-grid compact">${list.length ? list.map(productCard).join("") : "<p class='empty-state'>Use the compare button on products to add items.</p>"}</div>`;
  dialog.showModal();
}

async function bindActions() {
  document.addEventListener("click", async event => {
    try {
      const cartBtn = event.target.closest("[data-cart]");
      const wishBtn = event.target.closest("[data-wishlist]");
      const quickBtn = event.target.closest("[data-quick]");
      const compareBtn = event.target.closest("[data-compare]");
      const qtyBtn = event.target.closest("[data-qty]");
      const removeBtn = event.target.closest("[data-remove]");
      if (cartBtn) await addToCart(Number(cartBtn.dataset.cart));
      if (wishBtn) await toggleWishlist(Number(wishBtn.dataset.wishlist));
      if (quickBtn) quickView(Number(quickBtn.dataset.quick));
      if (compareBtn) {
        const id = Number(compareBtn.dataset.compare);
        const list = getStore("lightcart_compare").filter(item => item !== id);
        setStore("lightcart_compare", [...list, id].slice(-3));
        toast("Added to comparison");
      }
      if (qtyBtn) {
        const id = Number(qtyBtn.dataset.qty);
        const current = cartState.items.find(item => item.product.id === id);
        const quantity = Math.max(0, (current?.quantity || 1) + Number(qtyBtn.dataset.step));
        cartState = await api(`/api/cart/${id}`, { method: "PATCH", body: JSON.stringify({ quantity }) });
        renderCart();
        updateCartCount();
      }
      if (removeBtn) {
        cartState = await api(`/api/cart/${Number(removeBtn.dataset.remove)}`, { method: "DELETE" });
        renderCart();
        updateCartCount();
      }
      if (event.target.closest("[data-checkout]")) {
        const data = await api("/api/orders/checkout", { method: "POST" });
        cartState = { items: [], summary: { count: 0 } };
        renderCart();
        updateCartCount();
        toast(`Order #${data.order.id} placed`);
      }
      if (event.target.closest("[data-compare-open]")) compareDialog();
      if (event.target.closest("[data-auth-action='logout']")) {
        await api("/api/auth/logout", { method: "POST" });
        location.href = "index.html";
      }
    } catch (error) {
      toast(error.message);
    }
  });
}

function initInteractions() {
  const savedTheme = localStorage.getItem("lightcart_theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.querySelectorAll(".theme-toggle").forEach(btn => btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("lightcart_theme", next);
  }));
  document.querySelectorAll(".menu-toggle").forEach(btn => btn.addEventListener("click", () => document.querySelector(".nav-links")?.classList.toggle("open")));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const backTop = document.querySelector(".back-top");
  window.addEventListener("scroll", () => backTop?.classList.toggle("visible", scrollY > 500));
  backTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelector(".chat-fab")?.addEventListener("click", () => toast("Chat support is online"));

  document.querySelectorAll("[data-newsletter], [data-contact]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    toast("Thanks. We received it.");
    form.reset();
  }));

  document.querySelectorAll(".search-form").forEach(form => {
    const input = form.querySelector("input");
    const suggestions = form.querySelector(".suggestions");
    input?.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
      suggestions.innerHTML = matches.map(p => `<button type="button" data-suggest="${p.name}">${p.name}</button>`).join("");
      suggestions.style.display = q && matches.length ? "block" : "none";
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      location.href = `search.html?q=${encodeURIComponent(input.value)}`;
    });
  });

  document.querySelectorAll("[data-search-suggestions]").forEach(el => {
    ["Wireless", "Gaming", "Lamp", "Beauty", "Sneakers"].forEach(term => el.insertAdjacentHTML("beforeend", `<button type="button" data-smart="${term}">${term}</button>`));
  });
  document.addEventListener("click", e => {
    const suggest = e.target.closest("[data-suggest]");
    const smart = e.target.closest("[data-smart]");
    if (suggest) location.href = `search.html?q=${encodeURIComponent(suggest.dataset.suggest)}`;
    if (smart) {
      const input = document.querySelector("#smartSearchInput");
      if (input) input.value = smart.dataset.smart;
      document.querySelector("#smartSearch")?.dispatchEvent(new Event("submit"));
    }
  });

  document.querySelectorAll("[data-countdown]").forEach(el => {
    const end = Date.now() + 1000 * 60 * 60 * 18;
    setInterval(() => {
      const left = Math.max(0, end - Date.now());
      const parts = [left / 86400000, left / 3600000 % 24, left / 60000 % 60, left / 1000 % 60].map(v => String(Math.floor(v)).padStart(2, "0"));
      el.querySelectorAll("b").forEach((b, index) => b.textContent = parts[index]);
    }, 1000);
  });

  document.querySelectorAll("[data-counter]").forEach(el => {
    const target = Number(el.dataset.counter);
    let value = 0;
    const timer = setInterval(() => {
      value += Math.max(1, Math.ceil(target / 40));
      el.textContent = Math.min(value, target);
      if (value >= target) clearInterval(timer);
    }, 30);
  });

  document.addEventListener("mousemove", e => {
    const img = document.querySelector("#zoomImage");
    if (!img || !e.target.closest(".gallery-main")) return;
    const rect = img.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`;
    img.style.transform = "scale(1.75)";
  });
  document.addEventListener("mouseleave", e => {
    if (e.target?.closest?.(".gallery-main")) document.querySelector("#zoomImage").style.transform = "scale(1)";
  }, true);
  document.addEventListener("click", e => {
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) document.querySelector("#zoomImage").src = thumb.dataset.thumb;
  });
}

function renderTestimonialsAndFaq() {
  document.querySelectorAll("[data-testimonials]").forEach(el => {
    el.innerHTML = testimonials.map(([name, text]) => `<article class="testimonial"><div class="rating">5.0 / 5</div><p>${text}</p><strong>${name}</strong></article>`).join("");
  });
  document.querySelectorAll("[data-faq]").forEach(el => {
    el.innerHTML = faqs.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("");
  });
}

function bindAuthForms() {
  document.querySelector("#signupForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: form.username.value,
          email: form.email.value,
          password: form.password.value
        })
      });
      toast("Account created");
      setTimeout(() => location.href = "products.html", 500);
    } catch (error) {
      toast(error.message);
    }
  });

  document.querySelector("#loginForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: form.identifier.value,
          password: form.password.value
        })
      });
      toast("Logged in");
      setTimeout(() => location.href = "products.html", 500);
    } catch (error) {
      toast(error.message);
    }
  });
}

function toast(message) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.lightcartToast);
  window.lightcartToast = setTimeout(() => el.classList.remove("show"), 2200);
}

window.addEventListener("load", () => document.body.classList.add("loaded"));
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await bootstrapData();
    initShell();
    renderAuthNav();
    renderHomeSections();
    renderCategories();
    renderTestimonialsAndFaq();
    setupCatalog();
    renderDetail();
    renderCart();
    renderWishlist();
    renderRecentlyViewed();
    bindActions();
    bindAuthForms();
    initInteractions();
    updateCartCount();
  } catch (error) {
    initShell();
    bindAuthForms();
    toast(error.message);
  }
});
