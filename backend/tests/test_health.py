def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "DoAide Contracts"
    assert "status" in data


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "DoAide Contracts"
    assert "docs" in data
