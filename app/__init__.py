from flask import Flask, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(config_object=None):
    app = Flask(
        __name__,
        template_folder="../",
        static_folder="../",
    )
    app.config.from_mapping(
        SECRET_KEY="change-me-in-production",
        SQLALCHEMY_DATABASE_URI="sqlite:///lightcart.db",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
    )
    if config_object:
        app.config.from_object(config_object)

    db.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.cart import cart_bp
    from app.routes.categories import categories_bp
    from app.routes.orders import orders_bp
    from app.routes.products import products_bp
    from app.routes.wishlist import wishlist_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(products_bp, url_prefix="/api/products")
    app.register_blueprint(categories_bp, url_prefix="/api/categories")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(wishlist_bp, url_prefix="/api/wishlist")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")

    page_templates = {
        "": "index.html",
        "index.html": "index.html",
        "about.html": "about.html",
        "cart.html": "cart.html",
        "categories.html": "categories.html",
        "contact.html": "contact.html",
        "faq.html": "faq.html",
        "login.html": "login.html",
        "product.html": "product.html",
        "products.html": "products.html",
        "search.html": "search.html",
        "signup.html": "signup.html",
        "wishlist.html": "wishlist.html",
    }

    @app.get("/")
    @app.get("/<path:page>")
    def serve_page(page=""):
        if page in page_templates:
            return render_template(page_templates[page])
        return send_from_directory(app.static_folder, page)

    return app
