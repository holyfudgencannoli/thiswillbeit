from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

engine = create_engine(Config.DATABASE_URL, echo=True, future=True)
metadata = MetaData()

# Define table manually
users_table = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String(150), unique=True, nullable=False),
    Column('password_hash', String(150), nullable=False)
)

metadata.create_all(engine)

# Session factory
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Helper functions
def create_user(username, password):
    session = SessionLocal()
    user = {"username": username, "password_hash": generate_password_hash(password)}
    session.execute(users_table.insert().values(**user))
    session.commit()
    session.close()

def get_user_by_username(username):
    session = SessionLocal()
    user = session.execute(users_table.select().where(users_table.c.username == username)).fetchone()
    session.close()
    return user

def check_password(user, password):
    return check_password_hash(user['password_hash'], password)
