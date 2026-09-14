from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(20), default="candidate")

    is_active = Column(Boolean, default=True, nullable=False)

    phone = Column(String(20), nullable=True)

    city = Column(String(100), nullable=True)

    country = Column(String(100), nullable=True)

    profile_image = Column(String(255), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cvs = relationship("CV", back_populates="user")

    jobs = relationship(
    "Job",
    back_populates="recruiter"
)

