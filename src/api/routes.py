"""
This module defines API routes for authentication and protected content.
"""
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import APIException
from datetime import timedelta

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

# ---------- SIGNUP ----------


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y password requeridos"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201

# ---------- LOGIN ----------


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y password requeridos"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    # Opcional: Expiración del token
    access_token = create_access_token(
        identity=user.id, expires_delta=timedelta(hours=1))

    return jsonify({"token": access_token, "user_id": user.id}), 200

# ---------- RUTA PRIVADA ----------


@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({"msg": f"Hola {user.email}, estás autenticado"}), 200
