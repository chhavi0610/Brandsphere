from flask import Blueprint, request, jsonify
from database.db import get_db_connection

order_bp = Blueprint('order', __name__)

@order_bp.route('/place', methods=['POST'])
def place_order():
    data = request.json()
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO orders
        (brand_id, product_id, quantity, order_date, status)
        VALUES (%s, %s, %s, CURRENT_DATE, 'Pending')
    """, (
        data['brand_id'],
        data['product_id'],
        data['quantity']
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Order placed successfully"})
