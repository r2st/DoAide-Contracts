from __future__ import annotations

from unittest.mock import patch


def test_risk_analyze_rejects_short_text(client):
    response = client.post(
        "/api/risk-analyzer/analyze",
        json={"contract_text": "Too short"},
    )
    assert response.status_code == 422


def test_risk_analyze_returns_503_when_gemini_not_configured(client):
    with patch("app.routers.risk_analyzer.is_configured", return_value=False):
        response = client.post(
            "/api/risk-analyzer/analyze",
            json={"contract_text": "A" * 100},
        )
        assert response.status_code == 503
        assert "unavailable" in response.json()["detail"].lower()


def test_risk_analyze_success(client):
    mock_result = {
        "overall_risk": "medium",
        "risk_score": 55,
        "summary": "Moderate risk contract.",
        "risky_clauses": [
            {
                "clause": "Unlimited liability",
                "risk_level": "high",
                "issue": "No cap",
                "suggestion": "Add cap",
            }
        ],
        "missing_clauses": [
            {
                "clause": "Force majeure",
                "importance": "critical",
                "reason": "Protects against events beyond control",
            }
        ],
        "indian_law_notes": ["Section 73 applies."],
    }

    with (
        patch("app.routers.risk_analyzer.is_configured", return_value=True),
        patch(
            "app.routers.risk_analyzer.analyze_contract_risk",
            return_value=mock_result,
        ),
    ):
        response = client.post(
            "/api/risk-analyzer/analyze",
            json={"contract_text": "A" * 100},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["overall_risk"] == "medium"
        assert data["risk_score"] == 55
        assert len(data["risky_clauses"]) == 1
        assert len(data["missing_clauses"]) == 1
        assert len(data["indian_law_notes"]) == 1


def test_risk_analyze_handles_gemini_error(client):
    from app.services.gemini_client import GeminiError

    with (
        patch("app.routers.risk_analyzer.is_configured", return_value=True),
        patch(
            "app.routers.risk_analyzer.analyze_contract_risk",
            side_effect=GeminiError("Connection failed"),
        ),
    ):
        response = client.post(
            "/api/risk-analyzer/analyze",
            json={"contract_text": "A" * 100},
        )
        assert response.status_code == 502
        assert "failed" in response.json()["detail"].lower()
