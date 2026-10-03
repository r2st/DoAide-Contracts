from __future__ import annotations

import logging
from typing import Any

from app.services.openrouter_client import OpenRouterError, chat_json, is_configured

logger = logging.getLogger(__name__)

REVIEW_PROMPT = """You are an expert Indian contract lawyer. Analyze the following contract clause and provide a risk assessment.

For the clause below, respond with a JSON object containing:
- "risk_level": one of "high", "medium", "low"
- "risk_score": a float from 0.0 (no risk) to 1.0 (maximum risk)
- "suggestion": a brief suggestion for improving the clause
- "suggested_clause": rewritten clause text that addresses the issues
- "explanation": plain-English explanation of the risks

Consider these risk factors:
- Unfavorable terms for the party receiving the contract
- Missing protections (liability caps, indemnification, termination rights)
- Ambiguous language that could be exploited
- Non-compliance with Indian Contract Act, 1872
- Missing GST/tax provisions where applicable
- One-sided penalty or termination clauses

Clause to analyze:
{clause_text}

Respond ONLY with the JSON object, no other text."""

SUMMARY_PROMPT = """You are an expert Indian contract lawyer. Based on the following clause-level risk analysis, provide an overall contract summary.

Respond with a JSON object containing:
- "overall_risk_score": weighted average risk score (0.0 to 1.0)
- "overall_risk_level": "high", "medium", or "low"
- "summary": a 2-3 sentence summary of the contract's risk profile

Clause analyses:
{clauses_json}

Respond ONLY with the JSON object, no other text."""


def review_clause(clause_text: str) -> dict[str, Any]:
    if not is_configured():
        return _fallback_review(clause_text)

    try:
        result = chat_json([
            {"role": "system", "content": "You are an expert Indian contract lawyer."},
            {"role": "user", "content": REVIEW_PROMPT.format(clause_text=clause_text)},
        ])
        return {
            "risk_level": result.get("risk_level", "medium"),
            "risk_score": min(1.0, max(0.0, float(result.get("risk_score", 0.5)))),
            "suggestion": result.get("suggestion", ""),
            "suggested_clause": result.get("suggested_clause", ""),
            "explanation": result.get("explanation", ""),
        }
    except (OpenRouterError, ValueError, TypeError) as exc:
        logger.warning("AI review failed, using fallback: %s", exc)
        return _fallback_review(clause_text)


def review_contract_summary(clauses: list[dict[str, Any]]) -> dict[str, Any]:
    if not is_configured() or not clauses:
        return _fallback_summary(clauses)

    import json
    try:
        result = chat_json([
            {"role": "system", "content": "You are an expert Indian contract lawyer."},
            {"role": "user", "content": SUMMARY_PROMPT.format(clauses_json=json.dumps(clauses))},
        ])
        return {
            "overall_risk_score": min(1.0, max(0.0, float(result.get("overall_risk_score", 0.5)))),
            "overall_risk_level": result.get("overall_risk_level", "medium"),
            "summary": result.get("summary", ""),
        }
    except (OpenRouterError, ValueError, TypeError) as exc:
        logger.warning("AI summary failed, using fallback: %s", exc)
        return _fallback_summary(clauses)


def _fallback_review(clause_text: str) -> dict[str, Any]:
    risk_keywords = {
        "high": ["indemnify", "unlimited liability", "sole discretion", "irrevocable",
                 "waive", "forfeit", "penalty", "liquidated damages"],
        "medium": ["terminate", "modification", "assignment", "confidential",
                   "non-compete", "exclusive", "binding"],
    }
    text_lower = clause_text.lower()
    for level, keywords in risk_keywords.items():
        if any(kw in text_lower for kw in keywords):
            score = 0.8 if level == "high" else 0.5
            return {
                "risk_level": level,
                "risk_score": score,
                "suggestion": f"This clause contains {level}-risk language. Review carefully.",
                "suggested_clause": "",
                "explanation": f"Keywords indicating {level} risk were detected.",
            }
    return {
        "risk_level": "low",
        "risk_score": 0.2,
        "suggestion": "No significant risks detected.",
        "suggested_clause": "",
        "explanation": "This clause appears standard.",
    }


def _fallback_summary(clauses: list[dict[str, Any]]) -> dict[str, Any]:
    if not clauses:
        return {"overall_risk_score": 0.0, "overall_risk_level": "low", "summary": "No clauses to analyze."}

    scores = [c.get("risk_score", 0.5) for c in clauses]
    avg_score = sum(scores) / len(scores)
    if avg_score >= 0.7:
        level = "high"
    elif avg_score >= 0.4:
        level = "medium"
    else:
        level = "low"
    return {
        "overall_risk_score": round(avg_score, 2),
        "overall_risk_level": level,
        "summary": f"Contract has {len(clauses)} clauses with an average risk score of {avg_score:.2f}.",
    }
