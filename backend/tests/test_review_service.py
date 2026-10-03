from app.services.contract_review import review_clause, _fallback_review, _fallback_summary


def test_fallback_review_high_risk():
    result = _fallback_review("The party shall indemnify and hold harmless against unlimited liability.")
    assert result["risk_level"] == "high"
    assert result["risk_score"] >= 0.7


def test_fallback_review_medium_risk():
    result = _fallback_review("Either party may terminate this agreement with 30 days notice.")
    assert result["risk_level"] == "medium"
    assert result["risk_score"] >= 0.4


def test_fallback_review_low_risk():
    result = _fallback_review("The governing law shall be the laws of India.")
    assert result["risk_level"] == "low"
    assert result["risk_score"] <= 0.3


def test_fallback_summary_with_clauses():
    clauses = [
        {"risk_score": 0.8, "risk_level": "high"},
        {"risk_score": 0.3, "risk_level": "low"},
        {"risk_score": 0.5, "risk_level": "medium"},
    ]
    result = _fallback_summary(clauses)
    assert 0.0 <= result["overall_risk_score"] <= 1.0
    assert result["overall_risk_level"] in ("high", "medium", "low")


def test_fallback_summary_empty():
    result = _fallback_summary([])
    assert result["overall_risk_score"] == 0.0
    assert result["overall_risk_level"] == "low"


def test_review_clause_no_api_key():
    result = review_clause("Standard payment terms apply.")
    assert "risk_level" in result
    assert "risk_score" in result
