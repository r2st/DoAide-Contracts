from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Float, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class ContractSource(str, Enum):
    UPLOAD = "upload"
    GENERATED = "generated"


class ContractStatus(str, Enum):
    PROCESSING = "processing"
    REVIEWED = "reviewed"
    DRAFT = "draft"
    FINAL = "final"


class Contract(Base):
    __tablename__ = "contracts"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    source: Mapped[str] = mapped_column(String(20), nullable=False)
    file_path: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    file_type: Mapped[str | None] = mapped_column(String(10), nullable=True)
    raw_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    overall_risk_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    risk_level: Mapped[str | None] = mapped_column(String(10), nullable=True)
    language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)
    status: Mapped[str] = mapped_column(String(20), default=ContractStatus.PROCESSING, nullable=False)
    template_id: Mapped[int | None] = mapped_column(
        ForeignKey("templates.id"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    review = relationship("ContractReview", back_populates="contract", uselist=False)
    clauses = relationship("ReviewClause", back_populates="contract", order_by="ReviewClause.clause_index")
