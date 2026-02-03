from flask_cors import cross_origin
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.db import get_db_connection
from flask_jwt_extended import create_access_token


auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["OPTIONS"])
def register_options():
    response = jsonify({"ok": True})
    response.headers.add("Access-Control-Allow-Origin", "https://brandsphere-q6a3.vercel.app")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    conn = get_db_connection()
    
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor()


    hashed_password = generate_password_hash(data['password'])

    cur.execute("""
        INSERT INTO users (name, email, password, role)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (data['name'], data['email'], hashed_password, data['role']))

    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "User registered", "user_id": user_id})

@auth_bp.route("/login", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["https://brandsphere-q6a3.vercel.app"],
    headers=["Content-Type", "Authorization"]
)
def login():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT id, password, role FROM users WHERE email=%s",
        (data['email'],)
    )
    user = cur.fetchone()

    if not user or not check_password_hash(user[1], data['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity={
            "user_id": user[0],
            "role": user[2]
        }
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "role": user[2]
    })
