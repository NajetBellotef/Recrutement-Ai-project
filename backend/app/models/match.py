from sqlalchemy import Column, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.database.database import Base

from datetime import datetime


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id")
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )

    # Score final
    score = Column(Float)

    # Détails du score
    embedding_score = Column(Float)

    skills_score = Column(Float)

    # Compétences
    common_skills = Column(Text)

    missing_skills = Column(Text)

    # Explication IA
    comment = Column(Text)

    created_at = Column(
    DateTime,
    default=datetime.utcnow
)
    #relation entre les objets Python/SQLAlchemy

    cv = relationship(
    "CV",
    back_populates="matches"
)

    job = relationship(
    "Job",
    back_populates="matches"
)