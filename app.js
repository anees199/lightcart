const products = [
  { id: 1, name: "Auralux Noise Canceling Headphones", category: "Electronics", price: 129, old: 189, rating: 4.8, reviews: 284, badge: "32% OFF", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", tags: ["audio", "wireless", "featured"] },
  { id: 2, name: "NovaFit Knit Runner Sneakers", category: "Fashion", price: 84, old: 120, rating: 4.7, reviews: 172, badge: "Hot", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", tags: ["shoes", "trending"] },
  { id: 3, name: "Orbit Smart LED Desk Lamp", category: "Home & Living", price: 58, old: 79, rating: 4.6, reviews: 96, badge: "Deal", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80", tags: ["home", "recommended", "featured"] },
  { id: 4, name: "PixelPro 5G Compact Phone", category: "Electronics", price: 449, old: 549, rating: 4.9, reviews: 418, badge: "18% OFF", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80", tags: ["phone", "bestseller", "featured"] },
  { id: 5, name: "Vero Hydrating Skincare Set", category: "Beauty", price: 42, old: 65, rating: 4.7, reviews: 211, badge: "Bundle", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80", tags: ["beauty", "trending"] },
  { id: 6, name: "Zenith Pro Gaming Controller", category: "Gaming", price: 76, old: 99, rating: 4.5, reviews: 148, badge: "23% OFF", img: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=80", tags: ["gaming", "recommended"] },
  { id: 7, name: "Atlas Weekender Travel Bag", category: "Accessories", price: 96, old: 140, rating: 4.8, reviews: 203, badge: "Best", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80", tags: ["bag", "bestseller"] },
  { id: 8, name: "Forge Adjustable Home Dumbbells", category: "Sports", price: 199, old: 260, rating: 4.6, reviews: 121, badge: "Save $61", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80", tags: ["fitness", "trending"] },
  { id: 9, name: "Kindle-Style Minimal Reading Light", category: "Books", price: 27, old: 39, rating: 4.4, reviews: 88, badge: "New", img: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80", tags: ["books", "recommended"] },
  { id: 10, name: "Mini Creative Builder Toy Set", category: "Toys", price: 34, old: 49, rating: 4.5, reviews: 67, badge: "30% OFF", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80", tags: ["toys", "featured"] },
  { id: 11, name: "CloudSoft Cotton Bedding Kit", category: "Home & Living", price: 112, old: 150, rating: 4.9, reviews: 193, badge: "Premium", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80", tags: ["home", "bestseller"] },
  { id: 12, name: "Aero Smartwatch Series X", category: "Electronics", price: 219, old: 299, rating: 4.7, reviews: 256, badge: "Flash", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", tags: ["watch", "trending", "bestseller"] }
];

const categories = [
  ["Electronics", "electronics", "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80"],
  ["Fashion", "fashion", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"],
  ["Home & Living", "home", "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"],
  ["Beauty", "beauty", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"],
  ["Sports", "sports", "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"],
  ["Gaming", "gaming", "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"],
  ["Books", "books", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"],
  ["Toys", "toys", "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80"],
  ["Accessories", "accessories", "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&fit=crop&w=900&q=80"]
];

const testimonials = [
  ["Maya R.", "LightCart feels fast and polished. I found a sale bundle in two taps."],
  ["Jordan P.", "The product cards, filters, and quick view make browsing genuinely easy."],
  ["Selena K.", "Premium look without friction. The wishlist to cart flow is excellent."]
];

const faqs = [
  ["How do LightCart deals work?", "Discounts are shown on each product card with the original price, sale price, and badge."],
  ["Can I save products for later?", "Yes. Use the wishlist button on any product card, then move saved products to cart."],
  ["Is this a real checkout?", "This is a frontend-only demo. Cart, wishlist, and recently viewed items are stored in your browser."],
  ["Does the website support dark mode?", "Yes. The theme toggle stores your preference locally and applies it across pages."],
  ["How do filters and sorting work?", "Products can be filtered by category, price, and text, then sorted by price or rating."]
];

const money = value => `$${value.toFixed(2)}`;
const getStore = key => JSON.parse(localStorage.getItem(key) || "[]");
const setStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const cart = () => getStore("lightcart_cart");
const wishlist = () => getStore("lightcart_wishlist");

function initShell() {
  document.querySelectorAll(".site-header:empty").forEach(header => {
    header.innerHTML = document.querySelector(".site-header")?.innerHTML || `
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
        <div class="mega-menu"><a href="categories.html#electronics">Electronics</a><a href="categories.html#fashion">Fashion</a><a href="categories.html#home">Home & Living</a><a href="categories.html#beauty">Beauty</a><a href="categories.html#gaming">Gaming</a></div>
      </nav>`;
  });

  document.querySelectorAll(".site-footer").forEach(footer => {
    footer.innerHTML = `
      <div class="footer-inner">
        <div><h3 class="brand"><span>Light</span>Cart</h3><p>Premium marketplace frontend with responsive shopping flows and modern interactions.</p></div>
        <div><h4>Shop</h4><a href="products.html">Products</a><a href="categories.html">Categories</a><a href="wishlist.html">Wishlist</a><a href="cart.html">Cart</a></div>
        <div><h4>Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="faq.html">FAQ</a></div>
        <div><h4>Social</h4><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">LinkedIn</a></div>
      </div>`;
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
        <button class="icon-button" data-wishlist="${product.id}" aria-label="Add ${product.name} to wishlist">W</button>
        <button class="icon-button" data-quick="${product.id}" aria-label="Quick view ${product.name}">View</button>
      </div>
      <div class="product-info">
        <p class="meta">${product.category}</p>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="rating">* ${product.rating} <span class="meta">(${product.reviews})</span></div>
        <div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.old)}</span></div>
        <div class="product-buttons">
          <button class="button primary" data-cart="${product.id}">Add to Cart</button>
          <button class="icon-button" data-compare="${product.id}" aria-label="Compare ${product.name}">Cmp</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(target, list) {
  if (!target) return;
  target.innerHTML = list.length ? list.map(productCard).join("") : `<div class="empty-state">No products found.</div>`;
}

function renderHomeSections() {
  const sections = {
    featured: products.filter(p => p.tags.includes("featured")).slice(0, 4),
    trending: products.filter(p => p.tags.includes("trending")),
    bestsellers: products.filter(p => p.tags.includes("bestseller")).slice(0, 4),
    recommended: products.filter(p => p.tags.includes("recommended")).slice(0, 2),
    related: products.slice(0, 8)
  };
  document.querySelectorAll("[data-product-section]").forEach(el => renderProducts(el, sections[el.dataset.productSection] || products.slice(0, 4)));
}

function renderCategories() {
  document.querySelectorAll("[data-categories]").forEach(el => {
    el.innerHTML = categories.map(([name, slug, img]) => `<a id="${slug}" class="category-card" href="products.html?category=${encodeURIComponent(name)}" style="background-image:url('${img}')"><div><p class="eyebrow">${products.filter(p => p.category === name).length || 8} deals</p><h3>${name}</h3></div></a>`).join("");
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
    categories.forEach(([name]) => categoryFilter.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`));
    categoryFilter.value = initialCategory;
  }
  if (search) search.value = initialQuery;

  const skeleton = document.querySelector("[data-skeleton]");
  if (skeleton) {
    skeleton.innerHTML = Array.from({ length: 8 }, () => `<div class="skeleton"></div>`).join("");
    skeleton.classList.add("active");
  }

  function apply() {
    let list = [...products];
    const q = (search?.value || "").toLowerCase();
    const cat = categoryFilter?.value || "all";
    const max = Number(price?.value || 9999);
    if (q) list = list.filter(p => `${p.name} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q));
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
      }, 350);
    } else {
      renderProducts(grid, list);
    }
  }

  [categoryFilter, sort, search, price].forEach(el => el?.addEventListener("input", apply));
  document.querySelector("#smartSearch")?.addEventListener("submit", e => { e.preventDefault(); apply(); });
  apply();
}

function addToCart(id) {
  const list = cart();
  const existing = list.find(item => item.id === id);
  existing ? existing.qty++ : list.push({ id, qty: 1 });
  setStore("lightcart_cart", list);
  updateCartCount();
  toast("Added to cart");
}

function toggleWishlist(id) {
  const list = wishlist();
  const next = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
  setStore("lightcart_wishlist", next);
  toast(next.includes(id) ? "Saved to wishlist" : "Removed from wishlist");
  renderWishlist();
}

function updateCartCount() {
  const count = cart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
}

function renderCart() {
  const items = cart();
  const wrap = document.querySelector("#cartItems");
  const summary = document.querySelector("#cartSummary");
  if (!wrap || !summary) return;
  if (!items.length) {
    wrap.innerHTML = `<div class="empty-state">Your cart is empty.</div>`;
    summary.innerHTML = `<h2>Summary</h2><p class="meta">Add products to see totals.</p>`;
    return;
  }
  const lines = items.map(item => ({ ...products.find(p => p.id === item.id), qty: item.qty }));
  wrap.innerHTML = lines.map(item => `
    <article class="cart-line">
      <img src="${item.img}" alt="${item.name}">
      <div><h3>${item.name}</h3><p class="meta">${item.category}</p><div class="qty"><button data-qty="${item.id}" data-step="-1">-</button><span>${item.qty}</span><button data-qty="${item.id}" data-step="1">+</button></div></div>
      <div><strong>${money(item.price * item.qty)}</strong><button class="button ghost" data-remove="${item.id}">Remove</button></div>
    </article>`).join("");
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal * 0.12;
  const shipping = subtotal > 120 ? 0 : 9.99;
  summary.innerHTML = `<h2>Cart Summary</h2><div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Discount</span><strong>-${money(discount)}</strong></div><div class="summary-row"><span>Shipping</span><strong>${shipping ? money(shipping) : "Free"}</strong></div><div class="summary-row total"><span>Estimated Total</span><strong>${money(subtotal - discount + shipping)}</strong></div><button class="button primary" style="width:100%">Checkout</button>`;
}

function renderWishlist() {
  const grid = document.querySelector("#wishlistGrid");
  if (!grid) return;
  const list = products.filter(p => wishlist().includes(p.id));
  renderProducts(grid, list);
  if (!list.length) grid.innerHTML = `<div class="empty-state">Your wishlist is empty.</div>`;
}

function renderDetail() {
  const el = document.querySelector("#productDetail");
  if (!el) return;
  const id = Number(new URLSearchParams(location.search).get("id") || 1);
  const product = products.find(p => p.id === id) || products[0];
  const recent = getStore("lightcart_recent").filter(item => item !== product.id);
  setStore("lightcart_recent", [product.id, ...recent].slice(0, 6));
  const gallery = [product.img, ...products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(p => p.img)];
  el.innerHTML = `
    <div class="gallery">
      <div class="gallery-main"><img id="zoomImage" src="${product.img}" alt="${product.name}"></div>
      <div class="thumbs">${gallery.map(img => `<button data-thumb="${img}"><img src="${img}" alt=""></button>`).join("")}</div>
    </div>
    <div class="detail-panel">
      <p class="eyebrow">${product.category}</p><h1>${product.name}</h1><div class="rating">* ${product.rating} <span class="meta">${product.reviews} reviews</span></div>
      <div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.old)}</span><span class="badge" style="position:static">${product.badge}</span></div>
      <p>${product.name} blends premium materials, marketplace value, and everyday reliability. Designed for shoppers who want polished essentials without checkout friction.</p>
      <ul class="specs"><li>Fast dispatch from verified sellers</li><li>30-day return support</li><li>Premium packaging and quality checks</li><li>Compatible with LightCart bundle recommendations</li></ul>
      <div class="hero-actions"><button class="button primary" data-cart="${product.id}">Add to Cart</button><button class="button ghost" data-wishlist="${product.id}">Save Favorite</button></div>
      <div class="review"><strong>Customer review</strong><p class="meta">"Premium feel, quick delivery, and exactly as shown."</p></div>
    </div>`;
  renderProducts(document.querySelector("[data-bundle]"), [product, products[(id + 2) % products.length]]);
}

function renderRecentlyViewed() {
  const el = document.querySelector("[data-recently-viewed]");
  if (!el) return;
  renderProducts(el, products.filter(p => getStore("lightcart_recent").includes(p.id)).slice(0, 6));
}

function quickView(id) {
  const dialog = document.querySelector("#quickView");
  const product = products.find(p => p.id === id);
  if (!dialog || !product) return;
  dialog.innerHTML = `<div class="dialog-grid"><img src="${product.img}" alt="${product.name}"><div><button class="icon-button" onclick="this.closest('dialog').close()" aria-label="Close">x</button><p class="eyebrow">${product.category}</p><h2>${product.name}</h2><p class="rating">* ${product.rating} (${product.reviews})</p><p class="price">${money(product.price)}</p><p class="meta">Quick view with product highlights, discount badge, and instant actions.</p><button class="button primary" data-cart="${product.id}">Add to Cart</button></div></div>`;
  dialog.showModal();
}

function compareDialog() {
  const dialog = document.querySelector("#compareDialog");
  if (!dialog) return;
  const selected = getStore("lightcart_compare").slice(-3);
  const list = products.filter(p => selected.includes(p.id));
  dialog.innerHTML = `<button class="icon-button" onclick="this.closest('dialog').close()" aria-label="Close">x</button><h2>Product Comparison</h2><div class="product-grid compact">${list.length ? list.map(productCard).join("") : "<p class='empty-state'>Use the compare button on products to add items.</p>"}</div>`;
  dialog.showModal();
}

function bindActions() {
  document.addEventListener("click", event => {
    const cartBtn = event.target.closest("[data-cart]");
    const wishBtn = event.target.closest("[data-wishlist]");
    const quickBtn = event.target.closest("[data-quick]");
    const compareBtn = event.target.closest("[data-compare]");
    const qtyBtn = event.target.closest("[data-qty]");
    const removeBtn = event.target.closest("[data-remove]");
    if (cartBtn) addToCart(Number(cartBtn.dataset.cart));
    if (wishBtn) toggleWishlist(Number(wishBtn.dataset.wishlist));
    if (quickBtn) quickView(Number(quickBtn.dataset.quick));
    if (compareBtn) {
      const list = getStore("lightcart_compare").filter(id => id !== Number(compareBtn.dataset.compare));
      setStore("lightcart_compare", [...list, Number(compareBtn.dataset.compare)].slice(-3));
      toast("Added to comparison");
    }
    if (qtyBtn) {
      const id = Number(qtyBtn.dataset.qty);
      const step = Number(qtyBtn.dataset.step);
      const next = cart().map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + step) } : item);
      setStore("lightcart_cart", next);
      renderCart();
      updateCartCount();
    }
    if (removeBtn) {
      setStore("lightcart_cart", cart().filter(item => item.id !== Number(removeBtn.dataset.remove)));
      renderCart();
      updateCartCount();
    }
    if (event.target.closest("[data-compare-open]")) compareDialog();
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

function toast(message) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.lightcartToast);
  window.lightcartToast = setTimeout(() => el.classList.remove("show"), 2200);
}

window.addEventListener("load", () => document.body.classList.add("loaded"));
document.addEventListener("DOMContentLoaded", () => {
  initShell();
  renderHomeSections();
  renderCategories();
  renderTestimonialsAndFaq();
  setupCatalog();
  renderDetail();
  renderCart();
  renderWishlist();
  renderRecentlyViewed();
  bindActions();
  initInteractions();
  updateCartCount();
});
