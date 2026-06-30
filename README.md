# LightCart Flask Backend

LightCart is now a Flask + SQLite e-commerce app. The existing frontend design is kept intact; JavaScript connects the current product, cart, wishlist, auth, and checkout flows to REST APIs.

## Features

- Flask app factory with modular Blueprints
- SQLite database via SQLAlchemy
- Signup, login, logout, and session-based current user
- Secure password hashing with Werkzeug
- Email, username, and password validation
- Product and category APIs
- Cart APIs: add, remove, update quantity
- Wishlist APIs: add/toggle and remove
- Checkout API that creates orders, order items, decrements stock, and clears cart
- Seed data with 216 products across the 9 existing categories

## Setup

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python init_db.py
python run.py
```

Open `http://127.0.0.1:5000`.

## Important Files

- `run.py` - Flask entry point
- `config.py` - environment-driven configuration
- `init_db.py` - resets and seeds SQLite with categories and products
- `app/__init__.py` - app factory, routes, and Blueprint registration
- `app/models.py` - SQLAlchemy models
- `app/routes/` - auth, products, categories, cart, wishlist, and orders APIs
- `app.js` - existing frontend behavior connected to backend APIs
- `login.html` and `signup.html` - account pages using the existing UI style

## API Overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/<id>`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/<product_id>`
- `DELETE /api/cart/<product_id>`
- `GET /api/wishlist`
- `POST /api/wishlist`
- `DELETE /api/wishlist/<product_id>`
- `GET /api/orders`
- `POST /api/orders/checkout`

Cart, wishlist, and order endpoints require login.
