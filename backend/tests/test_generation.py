def test_generate_contract(auth_client):
    template = auth_client.post(
        "/api/templates/custom",
        json={
            "name": "Simple NDA",
            "category": "nda",
            "template_body": (
                "NON-DISCLOSURE AGREEMENT\n\n"
                "This Agreement is entered into between {{party_a}} "
                "and {{party_b}} on {{date}}.\n\n"
                "1. Confidential Information\n"
                "All information shared between the parties shall be kept confidential.\n\n"
                "2. Term\n"
                "This agreement shall remain in effect for {{duration}}.\n\n"
                "3. Governing Law\n"
                "This agreement shall be governed by the laws of India."
            ),
        },
    )
    assert template.status_code == 201
    template_id = template.json()["id"]

    response = auth_client.post(
        "/api/contracts/generate",
        json={
            "template_id": template_id,
            "title": "NDA with Acme Corp",
            "field_values": {
                "party_a": "DoAide Technologies",
                "party_b": "Acme Corporation",
                "date": "1st October 2026",
                "duration": "2 years",
            },
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "NDA with Acme Corp"
    assert data["source"] == "generated"
    assert data["status"] == "draft"


def test_generate_template_not_found(auth_client):
    response = auth_client.post(
        "/api/contracts/generate",
        json={
            "template_id": 99999,
            "title": "Test",
            "field_values": {},
        },
    )
    assert response.status_code == 404
