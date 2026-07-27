from pydantic import BaseModel


class CandidateSearchResponse(BaseModel):
    id: int
    filename: str


class JobSearchResponse(BaseModel):
    id: int
    title: str
    company: str