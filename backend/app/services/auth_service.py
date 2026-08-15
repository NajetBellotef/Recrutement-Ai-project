from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User


# =========================================================
# CONFIGURATION JWT
# =========================================================

SECRET_KEY = "RecruitmentAI2026SecretKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 360


# =========================================================
# OAUTH2
# =========================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


# =========================================================
# PASSWORD HASHING
# =========================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# =========================================================
# HASHER UN MOT DE PASSE
# =========================================================

def hash_password(password: str):
    return pwd_context.hash(password)


# =========================================================
# VÉRIFIER UN MOT DE PASSE
# =========================================================

def verify_password(
    plain_password: str,
    hashed_password: str
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# =========================================================
# CRÉER UN JWT
# =========================================================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# =========================================================
# DÉCODER / VÉRIFIER UN JWT
# =========================================================

def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("=================================")
        print("JWT VALIDE")
        print("PAYLOAD :", payload)
        print("=================================")

        return payload

    except JWTError as e:

        print("=================================")
        print("ERREUR JWT")
        print("TYPE :", type(e).__name__)
        print("DETAIL :", str(e))
        print("=================================")

        return None

# =========================================================
# CRÉER UN UTILISATEUR
# =========================================================

def create_user(
    db: Session,
    full_name: str,
    email: str,
    password: str
):

    # -----------------------------------------
    # Vérifier si l'email existe déjà
    # -----------------------------------------

    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        return None

    # -----------------------------------------
    # Hasher le mot de passe
    # -----------------------------------------

    hashed_password = hash_password(password)

    print("Mot de passe hashé :", hashed_password)

    # -----------------------------------------
    # Créer le nouvel utilisateur
    # -----------------------------------------

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

        print(
            "ERREUR SQLAlchemy :",
            repr(e)
        )

        raise


# =========================================================
# AUTHENTIFIER UN UTILISATEUR
# =========================================================

def authenticate_user(
    db: Session,
    email: str,
    password: str
):

    # -----------------------------------------
    # Rechercher l'utilisateur par email
    # -----------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        return None

    # -----------------------------------------
    # Vérifier le mot de passe
    # -----------------------------------------

    if not verify_password(
        password,
        user.password
    ):
        return None

    return user


# =========================================================
# RÉCUPÉRER L'UTILISATEUR CONNECTÉ
# =========================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    # -----------------------------------------
    # Vérifier le token
    # -----------------------------------------

    payload = verify_token(token)

    if payload is None:

        raise HTTPException(
            status_code=401,
            detail="Token invalide"
        )

    # -----------------------------------------
    # Récupérer l'ID depuis le JWT
    # -----------------------------------------

    user_id = payload.get("sub")

    if user_id is None:

        raise HTTPException(
            status_code=401,
            detail="Token invalide"
        )

    # -----------------------------------------
    # Convertir l'ID en entier
    # -----------------------------------------

    try:

        user_id = int(user_id)

    except (ValueError, TypeError):

        raise HTTPException(
            status_code=401,
            detail="Token invalide"
        )

    # -----------------------------------------
    # Rechercher l'utilisateur par ID
    # -----------------------------------------

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Utilisateur introuvable"
        )

    # -----------------------------------------
    # Vérifier que le compte est actif
    # -----------------------------------------

    if not user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Compte désactivé."
        )

    return user


# =========================================================
# VÉRIFIER QUE L'UTILISATEUR EST ADMIN
# =========================================================

def get_current_admin(
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Accès réservé à l'administrateur."
        )

    return current_user