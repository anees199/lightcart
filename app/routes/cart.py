from flask import Blueprint, jsonify, request

from app import db
from app.models import CartItem, Product
from app.utils import login_required, validation_error

cart_bp = Blueprint("cart", __name__)


def cart_payload(user):
    items = CartItem.query.filter_by(user_id=user.id).all()
    subtotal = round(sum(item.product.price * item.quantity for item in items), 2)
    discount = round(subtotal * 0.12, 2)
    shipping = 0 if subtotal > 120 or subtotal == 0 else 9.99
    total = round(subtotal - discount + shipping, 2)
    return {
        "items": [item.to_dict() for item in items],
        "summary": {
            "subtotal": subtotal,
            "discount": discount,
            "shipping": shipping,
            "total": total,
            "count": sum(item.quantity for item in items),
        },
    }


@cart_bp.get("")
@login_required
def get_cart(user):
    return jsonify(cart_payload(user))


@cart_bp.post("")
@login_required
def add_to_cart(user):
    data = request.get_json(silent=True) or {}
    try:
        product_id = int(data.get("product_id"))
        quantity = max(1, int(data.get("quantity", 1)))
    except (TypeError, ValueError):
        return validation_error("Valid product_id and quantity are required.")
    product = Product.query.get(product_id)
    if not product:
        return validation_error("Product not found.", 404)
    if product.stock < quantity:
        return validation_error("Not enough stock for this product.", 409)

    item = CartItem.query.filter_by(user_id=user.id, product_id=product.id).first()
    if item:
        item.quantity = min(product.stock, item.quantity + quantity)
    else:
        db.session.add(CartItem(user_id=user.id, product_id=product.id, quantity=quantity))
    db.session.commit()
    return jsonify({"message": "Added to cart.", **cart_payload(user)})


@cart_bp.patch("/<int:product_id>")
@login_required
def update_quantity(user, product_id):
    data = request.get_json(silent=True) or {}
    try:
        quantity = int(data.get("quantity", 1))
    except (TypeError, ValueError):
        return validation_error("Quantity must be a number.")
    item = CartItem.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not item:
        return validation_error("Cart item not found.", 404)
    if quantity < 1:
        db.session.delete(item)
    elif quantity > item.product.stock:
        return validation_error("Quantity exceeds available stock.", 409)
    else:
        item.quantity = quantity
    db.session.commit()
    return jsonify({"message": "Cart updated.", **cart_payload(user)})


@cart_bp.delete("/<int:product_id>")
@login_required
def remove_from_cart(user, product_id):
    item = CartItem.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not item:
        return validation_error("Cart item not found.", 404)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Removed from cart.", **cart_payload(user)})
