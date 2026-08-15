from pydantic import BaseModel


class RankingResponse(BaseModel):

    match_id: int
    
    cv_id: int

    user_id: int

    candidate: str

    email: str | None = None

    profile_image: str | None = None

    filename: str

    file_path: str

    score: float

    comment: str | None = None