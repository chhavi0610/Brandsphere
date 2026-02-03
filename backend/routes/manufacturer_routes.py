from flask import Blueprint, request, jsonify
from database.db import get_db_connection

manufacturer_bp = Blueprint('manufacturers', __name__)

@manufacturer_bp.route('/', methods=['POST'])
def add_manufacturer():
    data = request.json()
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO manufacturers 
        (user_id, company_name, category, price_range, rating, delivery_time)
        VALUES (%s,%s,%s,%s,%s,%s)
    """, tuple(data.values()))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Manufacturer added"})


@manufacturer_bp.route('/', methods=['GET'])
def get_manufacturers():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM manufacturers")
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)
