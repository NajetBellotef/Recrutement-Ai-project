from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.base import Base
from sqlalchemy.orm import relationship


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    company = Column(String(200), nullable=False)

    location = Column(String(150))

    description = Column(Text, nullable=False)

    required_skills = Column(Text)

    analysis = Column(Text)
    
    skills = Column(Text)
    
    embedding = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    matches = relationship(
    "Match",
    back_populates="job",
    cascade="all, delete-orphan"
    )