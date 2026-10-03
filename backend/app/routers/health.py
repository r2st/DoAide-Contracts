from __future__ import annotations

from fastapi import APIRouter

from app.core.config import settings
from app.core.database import check_database

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict:
    db_ok, db_error = check_database()
    return {
        "status": "healthy" if db_ok else "degraded",
        "app": settings.app_name,
        "version": settings.app_version,
        "database": "ok" if db_ok else db_error,
    }
