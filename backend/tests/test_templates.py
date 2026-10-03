import json


def test_create_custom_template(auth_client):
    response = auth_client.post(
        "/api/templates/custom",
        json={
            "name": "My NDA",
            "category": "nda",
            "description": "Custom NDA template",
            "field_schema": json.dumps({"fields": [{"name": "party_a", "type": "text"}]}),
            "template_body": "This NDA is between {{party_a}} and {{party_b}}.",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "My NDA"
    assert data["is_system"] is False


def test_list_templates(auth_client):
    auth_client.post(
        "/api/templates/custom",
        json={
            "name": "Test Template",
            "category": "msa",
            "template_body": "Template body here.",
        },
    )
    response = auth_client.get("/api/templates")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1


def test_get_template(auth_client):
    create = auth_client.post(
        "/api/templates/custom",
        json={
            "name": "Get Template",
            "category": "sow",
            "template_body": "SOW body.",
        },
    )
    template_id = create.json()["id"]
    response = auth_client.get(f"/api/templates/{template_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Get Template"


def test_update_template(auth_client):
    create = auth_client.post(
        "/api/templates/custom",
        json={
            "name": "Old Name",
            "category": "nda",
            "template_body": "Body.",
        },
    )
    template_id = create.json()["id"]
    response = auth_client.put(
        f"/api/templates/custom/{template_id}",
        json={"name": "New Name"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "New Name"


def test_delete_template(auth_client):
    create = auth_client.post(
        "/api/templates/custom",
        json={
            "name": "To Delete",
            "category": "nda",
            "template_body": "Body.",
        },
    )
    template_id = create.json()["id"]
    response = auth_client.delete(f"/api/templates/custom/{template_id}")
    assert response.status_code == 204

    response = auth_client.get(f"/api/templates/{template_id}")
    assert response.status_code == 404


def test_template_not_found(auth_client):
    response = auth_client.get("/api/templates/99999")
    assert response.status_code == 404
