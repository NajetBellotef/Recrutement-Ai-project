from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# =========================================================
# CRÉER UN RECRUTEUR
# =========================================================

class RecruiterCreate(BaseModel):

    full_name: str

    email: EmailStr

    password: str


# =========================================================
# RÉPONSE UTILISATEUR
# =========================================================

class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    created_at: datetime


    class Config:

        from_attributes = True


# =========================================================
# STATISTIQUES DASHBOARD
# =========================================================

class DashboardStats(BaseModel):

    total_users: int

    total_candidates: int

    total_recruiters: int

    total_admins: int


# =========================================================
# MODIFIER LE PROFIL ADMIN
# =========================================================

class AdminProfileUpdate(BaseModel):

    full_name: Optional[str] = None

    email: Optional[EmailStr] = None


# =========================================================
# MODIFIER LE MOT DE PASSE
# =========================================================

class AdminPasswordUpdate(BaseModel):

    current_password: str

    new_password: str