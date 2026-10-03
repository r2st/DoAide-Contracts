from __future__ import annotations

import logging
import re
from typing import Any

from app.services.openrouter_client import OpenRouterError, chat_completion, is_configured

logger = logging.getLogger(__name__)

GENERATE_PROMPT = """You are an expert Indian contract lawyer. Generate a complete, professional contract based on the following template and field values.

Template:
{template_body}

Field values to fill in:
{field_values}

Language: {language}

Instructions:
- Replace all {{placeholder}} markers with the provided values
- Ensure the contract complies with Indian Contract Act, 1872
- Include appropriate GST/tax clauses where applicable
- Use formal legal language appropriate for Indian courts
- Add standard boilerplate clauses (governing law, dispute resolution, entire agreement) if not already present

Return the complete contract text, ready for use."""


def generate_contract(
    template_body: str,
    field_values: dict[str, str],
    language: str = "en",
) -> str:
    filled = _fill_placeholders(template_body, field_values)

    if not is_configured():
        return filled

    try:
        import json
        result = chat_completion([
            {"role": "system", "content": "You are an expert Indian contract lawyer."},
            {"role": "user", "content": GENERATE_PROMPT.format(
                template_body=template_body,
                field_values=json.dumps(field_values, indent=2),
                language=language,
            )},
        ], max_tokens=8000)
        return result
    except OpenRouterError as exc:
        logger.warning("AI generation failed, using placeholder fill: %s", exc)
        return filled


def _fill_placeholders(template: str, values: dict[str, str]) -> str:
    result = template
    for key, value in values.items():
        result = result.replace(f"{{{{{key}}}}}", value)
    return result
