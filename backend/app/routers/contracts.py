from __future__ import annotations

import logging
import os
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.contract import Contract, ContractSource, ContractStatus
from app.models.review import ContractReview, ReviewClause
from app.models.user import User
from app.schemas.contract import (
    ClauseOut,
    ContractListOut,
    ContractOut,
    GenerateRequest,
    ReviewOut,
)
from app.services.contract_generator import generate_contract
from app.services.contract_review import review_clause, review_contract_summary
from app.services.document_parser import extract_text, segment_clauses
from app.services.usage_service import check_usage_limit, record_usage

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contracts", tags=["contracts"])


@router.post("/upload", response_model=ContractOut, status_code=status.HTTP_201_CREATED)
def upload_contract(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ContractOut:
    allowed, count, limit = check_usage_limit(db, current_user, "review")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Free tier limit reached: {count}/{limit} reviews this month. Upgrade to Pro for unlimited reviews.",
        )

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in ("pdf", "docx"):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF and DOCX files are supported.",
        )

    content = file.file.read()
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {settings.max_upload_mb}MB.",
        )

    upload_dir = settings.upload_dir
    os.makedirs(upload_dir, exist_ok=True)
    file_id = uuid.uuid4().hex
    file_path = os.path.join(upload_dir, f"{file_id}.{ext}")
    with open(file_path, "wb") as f:
        f.write(content)

    raw_text = extract_text(content, ext)

    title = file.filename.rsplit(".", 1)[0] if "." in file.filename else file.filename

    contract = Contract(
        user_id=current_user.id,
        title=title,
        source=ContractSource.UPLOAD,
        file_path=file_path,
        file_type=ext,
        raw_text=raw_text,
        status=ContractStatus.PROCESSING,
    )
    db.add(contract)
    db.flush()

    clauses = segment_clauses(raw_text)
    clause_reviews = []
    for clause in clauses:
        review_result = review_clause(clause["text"])
        clause_reviews.append({**clause, **review_result})

    summary = review_contract_summary(clause_reviews)

    review = ContractReview(
        contract_id=contract.id,
        overall_risk_score=summary["overall_risk_score"],
        overall_risk_level=summary["overall_risk_level"],
        summary=summary.get("summary", ""),
    )
    db.add(review)

    for cr in clause_reviews:
        db.add(ReviewClause(
            contract_id=contract.id,
            clause_index=cr["index"],
            clause_title=cr.get("title"),
            clause_text=cr["text"],
            risk_level=cr["risk_level"],
            risk_score=cr["risk_score"],
            suggestion=cr.get("suggestion"),
            suggested_clause=cr.get("suggested_clause"),
            explanation=cr.get("explanation"),
        ))

    contract.overall_risk_score = summary["overall_risk_score"]
    contract.risk_level = summary["overall_risk_level"]
    contract.status = ContractStatus.REVIEWED

    record_usage(db, current_user.id, "review", contract.id)

    db.commit()
    db.refresh(contract)

    return ContractOut.model_validate(contract)


@router.get("", response_model=ContractListOut)
def list_contracts(
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ContractListOut:
    total = db.scalar(
        select(func.count(Contract.id)).where(Contract.user_id == current_user.id)
    ) or 0
    contracts = db.scalars(
        select(Contract)
        .where(Contract.user_id == current_user.id)
        .order_by(Contract.created_at.desc())
        .offset(skip)
        .limit(limit)
    ).all()
    return ContractListOut(
        contracts=[ContractOut.model_validate(c) for c in contracts],
        total=total,
    )


@router.get("/{contract_id}", response_model=ContractOut)
def get_contract(
    contract_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ContractOut:
    contract = db.scalar(
        select(Contract).where(
            Contract.id == contract_id, Contract.user_id == current_user.id
        )
    )
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return ContractOut.model_validate(contract)


@router.get("/{contract_id}/clauses", response_model=list[ClauseOut])
def get_clauses(
    contract_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ClauseOut]:
    contract = db.scalar(
        select(Contract).where(
            Contract.id == contract_id, Contract.user_id == current_user.id
        )
    )
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    clauses = db.scalars(
        select(ReviewClause)
        .where(ReviewClause.contract_id == contract_id)
        .order_by(ReviewClause.clause_index)
    ).all()
    return [ClauseOut.model_validate(c) for c in clauses]


@router.get("/{contract_id}/review", response_model=ReviewOut)
def get_review(
    contract_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ReviewOut:
    contract = db.scalar(
        select(Contract).where(
            Contract.id == contract_id, Contract.user_id == current_user.id
        )
    )
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    review = db.scalar(
        select(ContractReview).where(ContractReview.contract_id == contract_id)
    )
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    clauses = db.scalars(
        select(ReviewClause)
        .where(ReviewClause.contract_id == contract_id)
        .order_by(ReviewClause.clause_index)
    ).all()

    return ReviewOut(
        id=review.id,
        contract_id=review.contract_id,
        overall_risk_score=review.overall_risk_score,
        overall_risk_level=review.overall_risk_level,
        summary=review.summary,
        clauses=[ClauseOut.model_validate(c) for c in clauses],
        created_at=review.created_at,
    )


@router.delete("/{contract_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contract(
    contract_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    from app.models.usage import UsageLog

    contract = db.scalar(
        select(Contract).where(
            Contract.id == contract_id, Contract.user_id == current_user.id
        )
    )
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    if contract.file_path and os.path.exists(contract.file_path):
        os.remove(contract.file_path)

    db.execute(select(ReviewClause).where(ReviewClause.contract_id == contract_id))
    for clause in db.scalars(select(ReviewClause).where(ReviewClause.contract_id == contract_id)).all():
        db.delete(clause)
    for review in db.scalars(select(ContractReview).where(ContractReview.contract_id == contract_id)).all():
        db.delete(review)
    for usage in db.scalars(select(UsageLog).where(UsageLog.contract_id == contract_id)).all():
        db.delete(usage)
    db.delete(contract)
    db.commit()


@router.post("/generate", response_model=ContractOut, status_code=status.HTTP_201_CREATED)
def generate_contract_endpoint(
    payload: GenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ContractOut:
    from app.models.template import Template

    allowed, count, limit = check_usage_limit(db, current_user, "generate")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Free tier limit reached: {count}/{limit} generations this month. Upgrade to Pro.",
        )

    template = db.get(Template, payload.template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    generated_text = generate_contract(
        template.template_body, payload.field_values, payload.language
    )

    contract = Contract(
        user_id=current_user.id,
        title=payload.title,
        source=ContractSource.GENERATED,
        raw_text=generated_text,
        language=payload.language,
        status=ContractStatus.DRAFT,
        template_id=template.id,
    )
    db.add(contract)

    template.usage_count += 1

    record_usage(db, current_user.id, "generate", contract.id)

    db.commit()
    db.refresh(contract)

    return ContractOut.model_validate(contract)
