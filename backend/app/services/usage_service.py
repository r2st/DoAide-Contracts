from __future__ import annotations

from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.usage import UsageLog
from app.models.user import User, UserPlan


def get_billing_period() -> date:
    today = date.today()
    return today.replace(day=1)


def get_usage_count(db: Session, user_id: int, action: str) -> int:
    period = get_billing_period()
    return db.scalar(
        select(func.count(UsageLog.id)).where(
            UsageLog.user_id == user_id,
            UsageLog.action == action,
            UsageLog.billing_period == period,
        )
    ) or 0


def check_usage_limit(db: Session, user: User, action: str) -> tuple[bool, int, int]:
    if user.plan in (UserPlan.PRO, UserPlan.ENTERPRISE):
        return True, 0, 0

    count = get_usage_count(db, user.id, action)

    if action == "review":
        limit = settings.free_reviews_per_month
    elif action == "generate":
        limit = settings.free_generations_per_month
    else:
        return True, 0, 0

    return count < limit, count, limit


def record_usage(db: Session, user_id: int, action: str, contract_id: int | None = None) -> None:
    log = UsageLog(
        user_id=user_id,
        action=action,
        contract_id=contract_id,
        billing_period=get_billing_period(),
    )
    db.add(log)
    db.flush()
