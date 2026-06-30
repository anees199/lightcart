from flask import Blueprint, jsonify, request

from app.models import Category, Product

products_bp = Blueprint("products", __name__)


@products_bp.get("")
def list_products():
    query = Product.query.join(Category)
    search = (request.args.get("q") or "").strip().lower()
    category = (request.args.get("category") or "").strip()
    max_price = request.args.get("max_price", type=float)
    sort = request.args.get("sort", "featured")

    if search:
        term = f"%{search}%"
        query = query.filter(
            Product.name.ilike(term)
            | Product.description.ilike(term)
            | Product.brand.ilike(term)
            | Category.name.ilike(term)
        )
    if category and category != "all":
        query = query.filter(Category.name == category)
    if max_price:
        query = query.filter(Product.price <= max_price)

    if sort == "low":
        query = query.order_by(Product.price.asc())
    elif sort == "high":
        query = query.order_by(Product.price.desc())
    elif sort == "rating":
        query = query.order_by(Product.rating.desc())
    else:
        query = query.order_by(Product.discount.desc(), Product.rating.desc())

    return jsonify({"products": [product.to_dict() for product in query.all()]})


@products_bp.get("/<int:product_id>")
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    related = (
        Product.query.filter(Product.category_id == product.category_id, Product.id != product.id)
        .order_by(Product.rating.desc())
        .limit(8)
        .all()
    )
    return jsonify(
        {
            "product": product.to_dict(),
            "related": [item.to_dict() for item in related],
        }
    )
