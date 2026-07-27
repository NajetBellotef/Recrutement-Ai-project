import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.engine import URL
from app.database.base import Base

load_dotenv()

print("HOST =", os.getenv("DB_HOST"))
print("PORT =", os.getenv("DB_PORT"))
print("USER =", os.getenv("DB_USER"))
print("DB =", os.getenv("DB_NAME"))

DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    database=os.getenv("DB_NAME"),
)
print(DATABASE_URL)

#SQLAlchemy ouvre la connexion avec PostgreSQL
engine = create_engine(DATABASE_URL)
#Cette session sera utilisée partout dans le projet
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

