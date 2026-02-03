from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity
from psycopg2.extras import RealDictCursor

product_bp = Blueprint('product', __name__)


@product_bp.route('/add', methods=['POST'])
@jwt_required()
def add_product():
    user = get_jwt_identity()

    if user['role'] != 'manufacturer':
        return jsonify({"error": "Access denied"}), 403
    
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO products
        (manufacturer_id, product_name, category, price, MOQ)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        data['manufacturer_id'],
        data['product_name'],
        data['category'],
        data['price'],
        data['MOQ']
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Product added"})


@product_bp.route('/', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT * FROM products")
    products = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(products)