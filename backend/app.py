from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.manufacturer_routes import manufacturer_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp
from routes.recommendation_routes import recommend_bp
import os
from flask_jwt_extended import JWTManager


app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "https://brandsphere-q6a3.vercel.app"}},
    supports_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)



app.config['JWT_SECRET_KEY'] = 'brandsphere-secret-key'
jwt = JWTManager(app)


app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(manufacturer_bp, url_prefix='/manufacturers')
app.register_blueprint(product_bp, url_prefix='/products')
app.register_blueprint(order_bp, url_prefix='/orders')
app.register_blueprint(recommend_bp, url_prefix='/recommend')

@app.route('/')
def home():
    return "BrandSphere API Running "


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
