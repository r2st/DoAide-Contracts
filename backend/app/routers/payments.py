from __future__ import annotations

import logging
from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.subscription import Subscription, SubscriptionStatus
from app.models.user import User, UserPlan
from app.schemas.payment import (
    CreateSubscriptionRequest,
    CreateSubscriptionResponse,
    PlanInfo,
    SubscriptionOut,
    VerifyPaymentRequest,
)
from app.services.razorpay_service import (
    PLAN_MAP,
    cancel_subscription,
    create_subscription,
    verify_payment_signature,
    verify_webhook_signature,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["payments"])

PLAN_FEATURES = {
    "free": PlanInfo(
        name="Free",
        price=0,
        features=[
            "3 contracts/month",
            "Basic templates",
            "PDF risk reports",
            "Email support",
        ],
    ),
    "pro": PlanInfo(
        name="Pro",
        price=399,
        features=[
            "Unlimited contracts",
            "E-signatures",
            "Custom templates",
            "Export to PDF/Word",
            "Version comparison",
            "Priority support",
        ],
    ),
    "enterprise": PlanInfo(
        name="Enterprise",
        price=1499,
        features=[
            "Everything in Pro",
            "API access",
            "Team collaboration",
            "Audit trail",
            "Compliance reporting",
            "Dedicated support",
        ],
    ),
}


@router.get("/plans", response_model=list[PlanInfo])
def list_plans() -> list[PlanInfo]:
    return list(PLAN_FEATURES.values())


@router.post("/subscribe", response_model=CreateSubscriptionResponse)
def subscribe(
    payload: CreateSubscriptionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CreateSubscriptionResponse:
    if current_user.plan == payload.plan:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You are already on the {payload.plan} plan.",
        )

    active_sub = db.scalar(
        select(Subscription).where(
            Subscription.user_id == current_user.id,
            Subscription.status.in_(["created", "authenticated", "active"]),
        )
    )
    if active_sub:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have an active subscription. Cancel it first to switch plans.",
        )

    plan_info = PLAN_MAP[payload.plan]

    rz_sub = create_subscription(
        plan=payload.plan,
        customer_email=current_user.email,
        customer_name=current_user.name,
    )

    subscription = Subscription(
        user_id=current_user.id,
        razorpay_subscription_id=rz_sub["id"],
        razorpay_plan_id=rz_sub["plan_id"],
        plan=payload.plan,
        status=SubscriptionStatus.CREATED,
        amount=plan_info["amount"],
    )
    db.add(subscription)
    db.commit()

    return CreateSubscriptionResponse(
        subscription_id=rz_sub["id"],
        razorpay_key_id=settings.razorpay_key_id,
        amount=plan_info["amount"],
        plan=payload.plan,
    )


@router.post("/verify", status_code=status.HTTP_200_OK)
def verify_payment(
    payload: VerifyPaymentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    if not verify_payment_signature(
        payload.razorpay_subscription_id,
        payload.razorpay_payment_id,
        payload.razorpay_signature,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment verification failed. Invalid signature.",
        )

    subscription = db.scalar(
        select(Subscription).where(
            Subscription.razorpay_subscription_id == payload.razorpay_subscription_id,
            Subscription.user_id == current_user.id,
        )
    )
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found.",
        )

    subscription.status = SubscriptionStatus.ACTIVE
    subscription.current_period_start = datetime.now(UTC)

    current_user.plan = subscription.plan

    db.commit()

    logger.info(
        "Payment verified, plan upgraded",
        extra={"user_id": current_user.id, "plan": subscription.plan},
    )

    return {"status": "ok", "plan": subscription.plan}


@router.get("/subscription", response_model=SubscriptionOut | None)
def get_subscription(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> SubscriptionOut | None:
    subscription = db.scalar(
        select(Subscription)
        .where(Subscription.user_id == current_user.id)
        .order_by(Subscription.created_at.desc())
    )
    if not subscription:
        return None
    return SubscriptionOut.model_validate(subscription)


@router.post("/cancel", status_code=status.HTTP_200_OK)
def cancel_sub(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    subscription = db.scalar(
        select(Subscription).where(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatus.ACTIVE,
        )
    )
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active subscription to cancel.",
        )

    cancel_subscription(subscription.razorpay_subscription_id)

    subscription.status = SubscriptionStatus.CANCELLED
    current_user.plan = UserPlan.FREE

    db.commit()

    logger.info("Subscription cancelled", extra={"user_id": current_user.id})

    return {"status": "cancelled"}


@router.post("/webhook", status_code=status.HTTP_200_OK)
async def razorpay_webhook(
    request: Request,
    db: Session = Depends(get_db),
) -> dict:
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature", "")

    if not verify_webhook_signature(body, signature):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid webhook signature.",
        )

    import json
    event = json.loads(body)
    event_type = event.get("event", "")

    if event_type == "subscription.activated":
        _handle_subscription_activated(event, db)
    elif event_type == "subscription.cancelled":
        _handle_subscription_cancelled(event, db)
    elif event_type == "subscription.charged":
        _handle_subscription_charged(event, db)
    elif event_type == "subscription.paused":
        _handle_subscription_paused(event, db)

    return {"status": "ok"}


def _handle_subscription_activated(event: dict, db: Session) -> None:
    sub_entity = event.get("payload", {}).get("subscription", {}).get("entity", {})
    rz_sub_id = sub_entity.get("id")
    if not rz_sub_id:
        return

    subscription = db.scalar(
        select(Subscription).where(Subscription.razorpay_subscription_id == rz_sub_id)
    )
    if not subscription:
        return

    subscription.status = SubscriptionStatus.ACTIVE
    subscription.current_period_start = datetime.now(UTC)

    user = db.get(User, subscription.user_id)
    if user:
        user.plan = subscription.plan

    db.commit()


def _handle_subscription_cancelled(event: dict, db: Session) -> None:
    sub_entity = event.get("payload", {}).get("subscription", {}).get("entity", {})
    rz_sub_id = sub_entity.get("id")
    if not rz_sub_id:
        return

    subscription = db.scalar(
        select(Subscription).where(Subscription.razorpay_subscription_id == rz_sub_id)
    )
    if not subscription:
        return

    subscription.status = SubscriptionStatus.CANCELLED

    user = db.get(User, subscription.user_id)
    if user:
        user.plan = UserPlan.FREE

    db.commit()


def _handle_subscription_charged(event: dict, db: Session) -> None:
    sub_entity = event.get("payload", {}).get("subscription", {}).get("entity", {})
    rz_sub_id = sub_entity.get("id")
    if not rz_sub_id:
        return

    subscription = db.scalar(
        select(Subscription).where(Subscription.razorpay_subscription_id == rz_sub_id)
    )
    if not subscription:
        return

    subscription.status = SubscriptionStatus.ACTIVE
    subscription.current_period_start = datetime.now(UTC)
    db.commit()


def _handle_subscription_paused(event: dict, db: Session) -> None:
    sub_entity = event.get("payload", {}).get("subscription", {}).get("entity", {})
    rz_sub_id = sub_entity.get("id")
    if not rz_sub_id:
        return

    subscription = db.scalar(
        select(Subscription).where(Subscription.razorpay_subscription_id == rz_sub_id)
    )
    if not subscription:
        return

    subscription.status = SubscriptionStatus.PAUSED
    db.commit()
