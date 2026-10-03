from __future__ import annotations

import io
import logging
import re

logger = logging.getLogger(__name__)


def extract_text_from_pdf(content: bytes) -> str:
    from PyPDF2 import PdfReader

    reader = PdfReader(io.BytesIO(content))
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n\n".join(pages)


def extract_text_from_docx(content: bytes) -> str:
    from docx import Document

    doc = Document(io.BytesIO(content))
    paragraphs = []
    for para in doc.paragraphs:
        if para.text.strip():
            paragraphs.append(para.text)
    return "\n\n".join(paragraphs)


def extract_text(content: bytes, file_type: str) -> str:
    if file_type == "pdf":
        return extract_text_from_pdf(content)
    elif file_type == "docx":
        return extract_text_from_docx(content)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")


def segment_clauses(text: str) -> list[dict]:
    clause_pattern = re.compile(
        r"(?:^|\n)(?:\d+[\.\)]\s+|(?:CLAUSE|ARTICLE|SECTION)\s+\d+[:\.\s])",
        re.IGNORECASE | re.MULTILINE,
    )

    matches = list(clause_pattern.finditer(text))
    if not matches:
        chunks = text.split("\n\n")
        return [
            {"index": i, "title": f"Section {i + 1}", "text": chunk.strip()}
            for i, chunk in enumerate(chunks)
            if chunk.strip() and len(chunk.strip()) > 20
        ]

    clauses = []
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        clause_text = text[start:end].strip()
        lines = clause_text.split("\n", 1)
        title = lines[0].strip()[:200]
        clauses.append({
            "index": i,
            "title": title,
            "text": clause_text,
        })

    return clauses
