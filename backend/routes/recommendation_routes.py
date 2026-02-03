from flask import Blueprint, request, jsonify
from ml.recommender import get_manufacturer_recommendations

recommend_bp = Blueprint('recommend', __name__)

@recommend_bp.route('/manufacturers', methods=['GET'])
def recommend_manufacturers():
    category = request.args.get('category')

    recommendations = get_manufacturer_recommendations(category)
    return jsonify(recommendations)
