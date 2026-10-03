from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateSubscriptionRequest(BaseModel):
    plan: str = Field(pattern="^(pro|enterprise)$")


class CreateSubscriptionResponse(BaseModel):
    subscription_id: str
    razorpay_key_id: str
    amount: int
    currency: str = "INR"
    plan: str


class VerifyPaymentRequest(BaseModel):
    razorpay_subscription_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class SubscriptionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    plan: str
    status: str
    amount: int
    currency: str
    razorpay_subscription_id: str
    current_period_start: datetime | None = None
    current_period_end: datetime | None = None
    created_at: datetime


class PlanInfo(BaseModel):
    name: str
    price: int
    currency: str = "INR"
    period: str = "month"
    features: list[str]
