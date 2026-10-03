from tests.conftest import TEST_EMAIL, TEST_PASSWORD


def test_register(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "new@example.com", "password": "strongpassword", "name": "New User"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["user"]["email"] == "new@example.com"
    assert data["user"]["name"] == "New User"
    assert data["user"]["plan"] == "free"
    assert "access_token" in data


def test_register_duplicate_email(client):
    client.post(
        "/api/auth/register",
        json={"email": "dup@example.com", "password": "strongpassword", "name": "User"},
    )
    response = client.post(
        "/api/auth/register",
        json={"email": "dup@example.com", "password": "anotherpass", "name": "User2"},
    )
    assert response.status_code == 409


def test_register_short_password(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "short@example.com", "password": "short", "name": "User"},
    )
    assert response.status_code == 422


def test_login(client):
    client.post(
        "/api/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD, "name": "Test User"},
    )
    response = client.post(
        "/api/auth/login",
        data={"username": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password(client):
    client.post(
        "/api/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD, "name": "Test User"},
    )
    response = client.post(
        "/api/auth/login",
        data={"username": TEST_EMAIL, "password": "wrongpassword"},
    )
    assert response.status_code == 401


def test_login_nonexistent_user(client):
    response = client.post(
        "/api/auth/login",
        data={"username": "nobody@example.com", "password": "whatever"},
    )
    assert response.status_code == 401


def test_me(auth_client):
    response = auth_client.get("/api/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == TEST_EMAIL
    assert data["name"] == "Test User"


def test_me_unauthenticated(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401
