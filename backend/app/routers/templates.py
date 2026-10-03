from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.template import Template
from app.models.user import User
from app.schemas.template import (
    TemplateCreateRequest,
    TemplateListOut,
    TemplateOut,
    TemplateUpdateRequest,
)

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("", response_model=TemplateListOut)
def list_templates(
    category: str | None = Query(default=None),
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TemplateListOut:
    query = select(Template).where(
        (Template.is_system == True) | (Template.user_id == current_user.id)  # noqa: E712
    )
    count_query = select(func.count(Template.id)).where(
        (Template.is_system == True) | (Template.user_id == current_user.id)  # noqa: E712
    )

    if category:
        query = query.where(Template.category == category)
        count_query = count_query.where(Template.category == category)

    total = db.scalar(count_query) or 0
    templates = db.scalars(query.offset(skip).limit(limit)).all()
    return TemplateListOut(
        templates=[TemplateOut.model_validate(t) for t in templates],
        total=total,
    )


@router.get("/{template_id}", response_model=TemplateOut)
def get_template(
    template_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TemplateOut:
    template = db.get(Template, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    if not template.is_system and template.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Template not found")
    return TemplateOut.model_validate(template)


@router.post("/custom", response_model=TemplateOut, status_code=status.HTTP_201_CREATED)
def create_template(
    payload: TemplateCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TemplateOut:
    template = Template(
        name=payload.name,
        category=payload.category,
        subcategory=payload.subcategory,
        language=payload.language,
        description=payload.description,
        field_schema=payload.field_schema,
        template_body=payload.template_body,
        is_system=False,
        user_id=current_user.id,
    )
    db.add(template)
    db.commit()
    db.refresh(template)
    return TemplateOut.model_validate(template)


@router.put("/custom/{template_id}", response_model=TemplateOut)
def update_template(
    template_id: int,
    payload: TemplateUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TemplateOut:
    template = db.get(Template, template_id)
    if not template or template.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.is_system:
        raise HTTPException(status_code=403, detail="Cannot modify system templates")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(template, field, value)

    db.commit()
    db.refresh(template)
    return TemplateOut.model_validate(template)


@router.delete("/custom/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_template(
    template_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    template = db.get(Template, template_id)
    if not template or template.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.is_system:
        raise HTTPException(status_code=403, detail="Cannot delete system templates")

    db.delete(template)
    db.commit()
