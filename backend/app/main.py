from __future__ import annotations

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

import app.models  # noqa: F401
from app.core.config import settings
from app.core.database import check_database
from app.core.errors import register_exception_handlers
from app.routers import auth, contracts, feedback, health, oauth, payments, templates

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    logging.basicConfig(level=logging.INFO)
    logger.info("Starting %s v%s", settings.app_name, settings.app_version)

    db_ok, db_error = check_database()
    if db_ok:
        logger.info("Database reachable")
    else:
        logger.error("Database unreachable at startup: %s", db_error)

    yield
    logger.info("Shutdown complete")


def create_app() -> FastAPI:
    application = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="AI-powered contract review and generation for Indian SMBs.",
        debug=settings.debug,
        lifespan=lifespan,
    )

    register_exception_handlers(application)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
        expose_headers=["Content-Disposition"],
    )

    application.add_middleware(SessionMiddleware, secret_key=settings.jwt_secret)

    prefix = settings.api_prefix
    application.include_router(health.router, prefix=prefix)
    application.include_router(auth.router, prefix=prefix)
    application.include_router(oauth.router, prefix=prefix)
    application.include_router(contracts.router, prefix=prefix)
    application.include_router(templates.router, prefix=prefix)
    application.include_router(payments.router, prefix=prefix)
    application.include_router(feedback.router, prefix=prefix)

    @application.get("/", include_in_schema=False)
    def root() -> dict:
        return {
            "app": settings.app_name,
            "version": settings.app_version,
            "docs": "/docs",
            "health": f"{prefix}/health",
        }

    return application


app = create_app()
