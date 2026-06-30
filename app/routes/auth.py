from flask import Blueprint, jsonify, request, session

from app import db
from app.models import User
from app.utils import current_user, validate_signup_payload, validation_error

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/signup")
def signup():
    payload, error = validate_signup_payload(request.get_json(silent=True) or {})
    if error:
        return validation_error(error)

    if User.query.filter_by(username=payload["username"]).first():
        return validation_error("Username is already taken.", 409)
    if User.query.filter_by(email=payload["email"]).first():
        return validation_error("Email is already registered.", 409)

    user = User(username=payload["username"], email=payload["email"])
    user.set_password(payload["password"])
    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id
    return jsonify({"message": "Signup successful.", "user": user.to_dict()}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    identifier = (data.get("identifier") or data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not identifier or not password:
        return validation_error("Email/username and password are required.")

    user = User.query.filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()
    if not user or not user.check_password(password):
        return validation_error("Invalid login credentials.", 401)

    session["user_id"] = user.id
    return jsonify({"message": "Login successful.", "user": user.to_dict()})


@auth_bp.post("/logout")
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out."})


@auth_bp.get("/me")
def me():
    user = current_user()
    return jsonify({"user": user.to_dict() if user else None})
