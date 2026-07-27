from pydantic import BaseModel


class RankingResponse(BaseModel):
    cv_id: int
    candidate: str
    score: float
    comment: str