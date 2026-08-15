from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.base import Base
from sqlalchemy.orm import relationship


class CV(Base):
    __tablename__ = "cvs"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    file_path = Column(String(255), nullable=False)

    extracted_text = Column(Text)
    
    analysis = Column(Text)

    embedding = Column(Text)

    skills = Column(Text)

    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

     # Relation avec l'utilisateur
    user = relationship(
        "User",
        back_populates="cvs"
    )

    matches = relationship(
    "Match",
    back_populates="cv",
    cascade="all, delete-orphan"
)