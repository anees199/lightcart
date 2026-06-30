from flask import Blueprint, jsonify

from app.models import Category

categories_bp = Blueprint("categories", __name__)


@categories_bp.get("")
def list_categories():
    categories = Category.query.order_by(Category.name.asc()).all()
    return jsonify({"categories": [category.to_dict() for category in categories]})
