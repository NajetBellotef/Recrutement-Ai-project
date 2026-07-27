from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# ==========================
# Inscription
# ==========================
class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)


# ==========================
# Connexion
# ==========================
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ==========================
# Réponse JWT
# ==========================
class Token(BaseModel):
    access_token: str
    token_type: str


# ==========================
# Données contenues dans le JWT
# ==========================
class TokenData(BaseModel):
    email: Optional[str] = None