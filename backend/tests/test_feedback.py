from __future__ import annotations

import json
from unittest.mock import patch

from app.routers.feedback import FEEDBACK_FILE


def test_submit_feedback(client, tmp_path):
    tmp_file = tmp_path / "feedback.json"
    with patch("app.routers.feedback.FEEDBACK_FILE", tmp_file):
        response = client.post("/api/feedback", json={"message": "Love this tool!"})

    assert response.status_code == 201
    assert response.json() == {"status": "ok"}

    entries = json.loads(tmp_file.read_text())
    assert len(entries) == 1
    assert entries[0]["message"] == "Love this tool!"
    assert "created_at" in entries[0]


def test_submit_feedback_appends(client, tmp_path):
    tmp_file = tmp_path / "feedback.json"
    tmp_file.write_text(json.dumps([{"message": "first", "created_at": "2026-01-01T00:00:00+00:00"}]))

    with patch("app.routers.feedback.FEEDBACK_FILE", tmp_file):
        response = client.post("/api/feedback", json={"message": "second"})

    assert response.status_code == 201
    entries = json.loads(tmp_file.read_text())
    assert len(entries) == 2
    assert entries[1]["message"] == "second"


def test_submit_feedback_empty_message(client):
    response = client.post("/api/feedback", json={"message": ""})
    assert response.status_code == 422


def test_submit_feedback_missing_body(client):
    response = client.post("/api/feedback", json={})
    assert response.status_code == 422
