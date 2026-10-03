from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_DEFAULT_JWT_SECRET = "change-me-to-a-long-random-string"
_PRODUCTION_LIKE = frozenset({"production", "prod", "staging", "stage"})


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "DoAide Contracts"
    app_version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True
    api_prefix: str = "/api"
    backend_cors_origins: str = "http://localhost:5173,http://localhost:3000"

    jwt_secret: str = _DEFAULT_JWT_SECRET
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    bcrypt_rounds: int = Field(default=12, ge=4, le=31)

    database_url: str = "postgresql+psycopg://contracts:contracts@localhost:5432/doaide_contracts"

    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "google/gemma-2-9b-it:free"
    openrouter_app_url: str = "https://contracts.doaide.com"
    openrouter_app_title: str = "DoAide Contracts"
    openrouter_timeout_seconds: float = 90.0
    openrouter_max_attempts: int = Field(default=3, ge=1, le=10)

    google_client_id: str = ""
    google_client_secret: str = ""
    github_client_id: str = ""
    github_client_secret: str = ""
    microsoft_client_id: str = ""
    microsoft_client_secret: str = ""
    oauth_redirect_base: str = "http://localhost:3009"

    upload_dir: str = "./data/uploads"
    max_upload_mb: int = 25

    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    razorpay_plan_id_pro: str = ""
    razorpay_plan_id_enterprise: str = ""
    razorpay_webhook_secret: str = ""

    # Plan limits: reviews per month, generations per month
    free_reviews_per_month: int = 3
    free_generations_per_month: int = 2

    @field_validator("environment")
    @classmethod
    def _normalised_environment(cls, v: str) -> str:
        return v.strip().lower() or "development"

    @field_validator("database_url")
    @classmethod
    def _known_database(cls, v: str) -> str:
        url = v.strip()
        if not url:
            raise ValueError("DATABASE_URL must be set")
        if not url.startswith(("postgresql", "sqlite")):
            raise ValueError("DATABASE_URL must be a postgresql:// or sqlite:// URL")
        return url

    @model_validator(mode="after")
    def _production_invariants(self) -> Settings:
        if not self.is_production:
            return self
        if self.jwt_secret == _DEFAULT_JWT_SECRET:
            raise ValueError("JWT_SECRET must be set to a strong random value in production.")
        if self.debug:
            raise ValueError("DEBUG must be false in production.")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment in _PRODUCTION_LIKE

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.backend_cors_origins.split(",") if o.strip()]

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_mb * 1024 * 1024

    @property
    def keys_dir(self) -> Path:
        return Path(__file__).resolve().parents[3] / "keys"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
