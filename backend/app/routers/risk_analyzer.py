from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.gemini_client import GeminiError, analyze_contract_risk, is_configured

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/risk-analyzer", tags=["risk-analyzer"])


class RiskAnalyzeRequest(BaseModel):
    contract_text: str = Field(..., min_length=50, max_length=50000)


class RiskClause(BaseModel):
    clause: str
    risk_level: str
    issue: str
    suggestion: str


class MissingClause(BaseModel):
    clause: str
    importance: str
    reason: str


class RiskAnalyzeResponse(BaseModel):
    overall_risk: str
    risk_score: int
    summary: str
    risky_clauses: list[dict]
    missing_clauses: list[dict]
    indian_law_notes: list[str]


@router.post("/analyze", response_model=RiskAnalyzeResponse)
def analyze_risk(req: RiskAnalyzeRequest):
    if not is_configured():
        raise HTTPException(
            status_code=503,
            detail="AI risk analysis is temporarily unavailable. Please try again later.",
        )

    try:
        result = analyze_contract_risk(req.contract_text)
    except GeminiError as exc:
        logger.error("Risk analysis failed: %s", exc)
        raise HTTPException(
            status_code=502,
            detail="AI analysis failed. Please try again.",
        ) from exc

    return RiskAnalyzeResponse(
        overall_risk=result.get("overall_risk", "medium"),
        risk_score=min(100, max(1, int(result.get("risk_score", 50)))),
        summary=result.get("summary", ""),
        risky_clauses=result.get("risky_clauses", []),
        missing_clauses=result.get("missing_clauses", []),
        indian_law_notes=result.get("indian_law_notes", []),
    )
