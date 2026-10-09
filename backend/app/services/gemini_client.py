from __future__ import annotations

import json
import logging
import re
import time
from typing import Any

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


class GeminiError(RuntimeError):
    pass


_RETRYABLE_STATUS = frozenset({408, 429, 500, 502, 503, 504})
_BACKOFF_BASE_SECONDS = 1.0


def is_configured() -> bool:
    return bool(settings.gemini_api_key)


def extract_json_object(raw: str) -> dict[str, Any] | None:
    if not raw:
        return None
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.S)
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end <= start:
        return None
    try:
        parsed = json.loads(text[start : end + 1])
    except (ValueError, TypeError):
        return None
    return parsed if isinstance(parsed, dict) else None


def chat_completion(
    prompt: str,
    *,
    system: str = "",
    temperature: float = 0.1,
    max_tokens: int = 4000,
    timeout: float = 60.0,
) -> str:
    if not is_configured():
        raise GeminiError("GEMINI_API_KEY is not set")

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{settings.gemini_model}:generateContent?key={settings.gemini_api_key}"
    )

    contents = [{"parts": [{"text": prompt}]}]
    payload: dict[str, Any] = {
        "contents": contents,
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": max_tokens,
        },
    }
    if system:
        payload["systemInstruction"] = {"parts": [{"text": system}]}

    attempts = 3
    last_error: GeminiError | None = None

    for attempt in range(1, attempts + 1):
        try:
            response = httpx.post(url, json=payload, timeout=timeout)
        except httpx.TransportError as exc:
            last_error = GeminiError(f"Gemini request failed: {exc}")
            last_error.__cause__ = exc
        except httpx.HTTPError as exc:
            raise GeminiError(f"Gemini request failed: {exc}") from exc
        else:
            if response.status_code in _RETRYABLE_STATUS:
                last_error = GeminiError(
                    f"Gemini returned {response.status_code}: {response.text[:500]}"
                )
            elif response.status_code >= 400:
                raise GeminiError(
                    f"Gemini returned {response.status_code}: {response.text[:500]}"
                )
            else:
                return _extract_text(response)

        if attempt == attempts:
            break
        delay = _BACKOFF_BASE_SECONDS * 2 ** (attempt - 1)
        time.sleep(delay)

    raise last_error or GeminiError("Gemini request failed")


def _extract_text(response: Any) -> str:
    try:
        data = response.json()
    except ValueError as exc:
        raise GeminiError("Gemini returned a non-JSON body") from exc

    if not isinstance(data, dict):
        raise GeminiError(f"Gemini returned unexpected body: {str(data)[:300]}")

    candidates = data.get("candidates")
    if not isinstance(candidates, list) or not candidates:
        raise GeminiError(f"Gemini returned no candidates: {str(data)[:300]}")

    content = candidates[0].get("content", {})
    parts = content.get("parts", [])
    if not parts:
        raise GeminiError("Gemini returned empty content")

    text = parts[0].get("text", "").strip()
    if not text:
        raise GeminiError("Gemini returned an empty response")
    return text


def analyze_contract_risk(contract_text: str) -> dict[str, Any]:
    system_prompt = """You are a contract risk analyst specializing in Indian business law.
Analyze the provided contract text and return a JSON object with this exact structure:
{
  "overall_risk": "low" | "medium" | "high",
  "risk_score": <number 1-100>,
  "summary": "<2-3 sentence summary of the contract's risk profile>",
  "risky_clauses": [
    {
      "clause": "<quoted text or description of the risky clause>",
      "risk_level": "low" | "medium" | "high",
      "issue": "<what makes this clause risky>",
      "suggestion": "<how to improve or mitigate>"
    }
  ],
  "missing_clauses": [
    {
      "clause": "<name of the missing clause>",
      "importance": "critical" | "recommended" | "optional",
      "reason": "<why this clause should be included>"
    }
  ],
  "indian_law_notes": [
    "<relevant Indian law considerations, e.g. Indian Contract Act sections, stamp duty requirements, enforceability notes>"
  ]
}

Focus on:
- Unlimited or uncapped liability
- One-sided termination rights
- Broad indemnification
- Missing dispute resolution
- Missing governing law
- Enforceability under Indian Contract Act, 1872
- Stamp duty and registration requirements
- Non-compete enforceability under Section 27
- IP ownership clarity
- Payment terms and GST compliance

Return ONLY the JSON object, no other text."""

    prompt = f"Analyze this contract for risks:\n\n{contract_text[:15000]}"

    raw = chat_completion(prompt, system=system_prompt, temperature=0.1, max_tokens=4000)
    parsed = extract_json_object(raw)
    if parsed is None:
        raise GeminiError(f"Could not parse risk analysis response: {raw[:300]}")
    return parsed
