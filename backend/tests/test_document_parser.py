from app.services.document_parser import segment_clauses


def test_segment_numbered_clauses():
    text = (
        "1. Scope of Work\n"
        "The provider shall deliver services as described.\n\n"
        "2. Payment Terms\n"
        "Payment shall be made within 30 days.\n\n"
        "3. Termination\n"
        "Either party may terminate with notice."
    )
    clauses = segment_clauses(text)
    assert len(clauses) == 3
    assert clauses[0]["title"].startswith("1.")
    assert clauses[1]["title"].startswith("2.")


def test_segment_fallback():
    text = (
        "This is a paragraph about liability.\n\n"
        "This is another paragraph about payment terms and conditions.\n\n"
        "Short.\n\n"
        "This is a final paragraph about governing law and jurisdiction."
    )
    clauses = segment_clauses(text)
    assert len(clauses) >= 2


def test_segment_article_style():
    text = (
        "ARTICLE 1: Definitions\n"
        "In this agreement, terms have the following meanings.\n\n"
        "ARTICLE 2: Scope\n"
        "The scope covers all services rendered.\n\n"
        "ARTICLE 3: Payment\n"
        "Payment shall be monthly."
    )
    clauses = segment_clauses(text)
    assert len(clauses) == 3
