from fastapi import FastAPI

from app.api.matching import router as matching_router
from app.api.ai import router as ai_router

# ==========================================
# APPLICATION
# ==========================================

app = FastAPI(
    title="Recruitment AI Service",
    version="1.0.0"
)


# ==========================================
# ROUTES
# ==========================================

app.include_router(
    matching_router
)
app.include_router(ai_router)

# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health_check():

    return {
        "status": "ok",
        "service": "AI Service"
    }