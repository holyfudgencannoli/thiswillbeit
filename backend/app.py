from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(debug=True)
