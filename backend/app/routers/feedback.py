from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

router = APIRouter(tags=["feedback"])

FEEDBACK_FILE = Path(__file__).resolve().parent.parent.parent / "feedback.json"


class FeedbackIn(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)


@router.post("/feedback", status_code=201)
def submit_feedback(body: FeedbackIn) -> dict:
    entry = {
        "message": body.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    entries: list[dict] = []
    if FEEDBACK_FILE.exists():
        try:
            entries = json.loads(FEEDBACK_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            logger.warning("Could not read existing feedback file; starting fresh")

    entries.append(entry)
    FEEDBACK_FILE.write_text(json.dumps(entries, indent=2))

    return {"status": "ok"}
