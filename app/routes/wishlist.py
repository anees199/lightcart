from flask import Blueprint, jsonify, request

from app import db
from app.models import Product, WishlistItem
from app.utils import login_required, validation_error

wishlist_bp = Blueprint("wishlist", __name__)


def wishlist_payload(user):
    items = WishlistItem.query.filter_by(user_id=user.id).all()
    return {"items": [item.to_dict() for item in items]}


@wishlist_bp.get("")
@login_required
def get_wishlist(user):
    return jsonify(wishlist_payload(user))


@wishlist_bp.post("")
@login_required
def add_wishlist(user):
    data = request.get_json(silent=True) or {}
    try:
        product_id = int(data.get("product_id"))
    except (TypeError, ValueError):
        return validation_error("Valid product_id is required.")
    product = Product.query.get(product_id)
    if not product:
        return validation_error("Product not found.", 404)
    item = WishlistItem.query.filter_by(user_id=user.id, product_id=product.id).first()
    if item:
        db.session.delete(item)
        message = "Removed from wishlist."
    else:
        db.session.add(WishlistItem(user_id=user.id, product_id=product.id))
        message = "Saved to wishlist."
    db.session.commit()
    return jsonify({"message": message, **wishlist_payload(user)})


@wishlist_bp.delete("/<int:product_id>")
@login_required
def remove_wishlist(user, product_id):
    item = WishlistItem.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not item:
        return validation_error("Wishlist item not found.", 404)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Removed from wishlist.", **wishlist_payload(user)})
