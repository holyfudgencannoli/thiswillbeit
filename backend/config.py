import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "supersecretkey"
    DATABASE_URL = "sqlite:///users.db"
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "jwtsecretkey"
