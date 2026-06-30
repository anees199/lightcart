from flask import Blueprint, jsonify

from app import db
from app.models import CartItem, Order, OrderItem
from app.utils import login_required, validation_error

orders_bp = Blueprint("orders", __name__)


@orders_bp.get("")
@login_required
def list_orders(user):
    orders = Order.query.filter_by(user_id=user.id).order_by(Order.created_at.desc()).all()
    return jsonify({"orders": [order.to_dict() for order in orders]})


@orders_bp.post("/checkout")
@login_required
def checkout(user):
    cart_items = CartItem.query.filter_by(user_id=user.id).all()
    if not cart_items:
        return validation_error("Your cart is empty.")
    for item in cart_items:
        if item.quantity > item.product.stock:
            return validation_error(f"{item.product.name} does not have enough stock.", 409)

    subtotal = round(sum(item.product.price * item.quantity for item in cart_items), 2)
    discount = round(subtotal * 0.12, 2)
    shipping = 0 if subtotal > 120 else 9.99
    total = round(subtotal - discount + shipping, 2)
    order = Order(user_id=user.id, total=total)
    db.session.add(order)
    db.session.flush()

    for item in cart_items:
        item.product.stock -= item.quantity
        db.session.add(
            OrderItem(
                order_id=order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.product.price,
            )
        )
        db.session.delete(item)

    db.session.commit()
    return jsonify({"message": "Checkout complete.", "order": order.to_dict()}), 201
