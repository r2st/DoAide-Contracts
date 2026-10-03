from __future__ import annotations

import hashlib
import hmac
import logging
from typing import Any

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

RAZORPAY_API = "https://api.razorpay.com/v1"

PLAN_MAP = {
    "pro": {
        "amount": 39900,
        "name": "Pro",
        "description": "Unlimited contracts, e-signatures, custom templates, export to PDF/Word",
    },
    "enterprise": {
        "amount": 149900,
        "name": "Enterprise",
        "description": "Everything in Pro + API access, team collaboration, audit trail, compliance reporting",
    },
}


def _auth() -> tuple[str, str]:
    return (settings.razorpay_key_id, settings.razorpay_key_secret)


def _razorpay_plan_id(plan: str) -> str:
    if plan == "pro":
        return settings.razorpay_plan_id_pro
    if plan == "enterprise":
        return settings.razorpay_plan_id_enterprise
    raise ValueError(f"No Razorpay plan for: {plan}")


def create_subscription(plan: str, customer_email: str, customer_name: str) -> dict[str, Any]:
    plan_id = _razorpay_plan_id(plan)
    payload: dict[str, Any] = {
        "plan_id": plan_id,
        "total_count": 120,
        "quantity": 1,
        "notes": {
            "plan": plan,
            "email": customer_email,
            "name": customer_name,
        },
    }
    resp = httpx.post(
        f"{RAZORPAY_API}/subscriptions",
        json=payload,
        auth=_auth(),
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def fetch_subscription(subscription_id: str) -> dict[str, Any]:
    resp = httpx.get(
        f"{RAZORPAY_API}/subscriptions/{subscription_id}",
        auth=_auth(),
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def cancel_subscription(subscription_id: str, cancel_at_cycle_end: bool = True) -> dict[str, Any]:
    resp = httpx.post(
        f"{RAZORPAY_API}/subscriptions/{subscription_id}/cancel",
        json={"cancel_at_cycle_end": cancel_at_cycle_end},
        auth=_auth(),
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def verify_webhook_signature(body: bytes, signature: str) -> bool:
    expected = hmac.new(
        settings.razorpay_webhook_secret.encode("utf-8"),
        body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def verify_payment_signature(
    razorpay_subscription_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
) -> bool:
    message = f"{razorpay_payment_id}|{razorpay_subscription_id}"
    expected = hmac.new(
        settings.razorpay_key_secret.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, razorpay_signature)
