import re
from functools import wraps

from email_validator import EmailNotValidError, validate_email
from flask import jsonify, session

from app.models import User


USERNAME_RE = re.compile(r"^[A-Za-z0-9_]{3,40}$")


def validation_error(message, status=400):
    return jsonify({"error": message}), status


def validate_signup_payload(data):
    username = (data.get("username") or "").strip().lower()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not USERNAME_RE.match(username):
        return None, "Username must be 3-40 characters and use letters, numbers, or underscores."
    try:
        normalized_email = validate_email(email, check_deliverability=False).normalized
    except EmailNotValidError:
        return None, "Enter a valid email address."
    if len(password) < 8:
        return None, "Password must be at least 8 characters."
    if not re.search(r"[A-Za-z]", password) or not re.search(r"\d", password):
        return None, "Password must include at least one letter and one number."

    return {"username": username, "email": normalized_email.lower(), "password": password}, None


def current_user():
    user_id = session.get("user_id")
    return User.query.get(user_id) if user_id else None


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        user = current_user()
        if not user:
            return validation_error("Login required.", 401)
        return view(user, *args, **kwargs)

    return wrapped
