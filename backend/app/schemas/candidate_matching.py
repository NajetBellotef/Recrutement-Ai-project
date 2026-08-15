from pydantic import BaseModel


class CandidateMatchingResponse(BaseModel):

    match_id: int

    job_id: int

    title: str

    company: str

    location: str

    score: float

    embedding_score: float

    skills_score: float

    common_skills: str

    missing_skills: str

    comment: str

    class Config:
        from_attributes = True