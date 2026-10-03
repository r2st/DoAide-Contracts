from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TemplateOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category: str
    subcategory: str | None = None
    language: str
    description: str | None = None
    field_schema: str | None = None
    template_body: str
    is_system: bool
    user_id: int | None = None
    usage_count: int
    created_at: datetime
    updated_at: datetime


class TemplateListOut(BaseModel):
    templates: list[TemplateOut]
    total: int


class TemplateCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    category: str = Field(min_length=1, max_length=100)
    subcategory: str | None = None
    language: str = "en"
    description: str | None = None
    field_schema: str | None = None
    template_body: str = Field(min_length=1)


class TemplateUpdateRequest(BaseModel):
    name: str | None = None
    category: str | None = None
    subcategory: str | None = None
    language: str | None = None
    description: str | None = None
    field_schema: str | None = None
    template_body: str | None = None
