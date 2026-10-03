from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ContractOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    title: str
    source: str
    file_type: str | None = None
    overall_risk_score: float | None = None
    risk_level: str | None = None
    language: str
    status: str
    template_id: int | None = None
    created_at: datetime
    updated_at: datetime


class ContractListOut(BaseModel):
    contracts: list[ContractOut]
    total: int


class ClauseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    clause_index: int
    clause_title: str | None = None
    clause_text: str
    risk_level: str
    risk_score: float
    suggestion: str | None = None
    suggested_clause: str | None = None
    explanation: str | None = None


class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    contract_id: int
    overall_risk_score: float
    overall_risk_level: str
    summary: str | None = None
    clauses: list[ClauseOut] = []
    created_at: datetime


class GenerateRequest(BaseModel):
    template_id: int
    title: str = Field(min_length=1, max_length=500)
    field_values: dict[str, str] = {}
    language: str = "en"
