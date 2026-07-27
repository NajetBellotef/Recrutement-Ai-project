from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.models.user import User
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.security.auth import oauth2_scheme

# ==========================
# Configuration JWT
# ==========================

SECRET_KEY = "RecruitmentAI2026SecretKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 360

# ==========================
# Password Hashing
# ==========================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# ==========================
# Hasher un mot de passe
# ==========================

def hash_password(password: str):
    return pwd_context.hash(password)

# ==========================
# Vérifier un mot de passe
# ==========================

def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# ==========================
# Créer un JWT
# ==========================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

# ==========================
# Décoder un JWT
# ==========================

def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None
    
def create_user(
    db: Session,
    full_name: str,
    email: str,
    password: str
):
    # Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        return None

    # Hasher le mot de passe
    hashed_password = hash_password(password)
    print("Mot de passe hashé :", hashed_password)
    # Créer le nouvel utilisateur
    new_user = User(
        full_name=full_name,
        email=email,
        password=hashed_password,
        role="candidate",
        is_active=True
    )

    try:
        db.add(new_user)
        print("Utilisateur ajouté à la session")

        db.commit()
        print("Commit réussi")

        db.refresh(new_user)
        print("Refresh réussi")

        return new_user

    except Exception as e:
        db.rollback()
        print("ERREUR SQLAlchemy :", repr(e))
        raise
# ==========================
# Authentifier un utilisateur
# ==========================

def authenticate_user(
    db: Session,
    email: str,
    password: str
):
    # Rechercher l'utilisateur par email
    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        return None

    # Vérifier le mot de passe
    if not verify_password(password, user.password):
        return None

    return user

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Token invalide"
        )

    email = payload.get("sub")

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Utilisateur introuvable"
        )

    return user