from __future__ import annotations

import hashlib
import hmac
import json
from unittest.mock import patch


def _register(client, email="pay@example.com"):
    resp = client.post(
        "/api/auth/register",
        json={"email": email, "password": "strongpassword", "name": "Pay User"},
    )
    assert resp.status_code == 201
    return resp.json()["access_token"]


def _auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


def test_list_plans(client):
    resp = client.get("/api/payments/plans")
    assert resp.status_code == 200
    plans = resp.json()
    assert len(plans) == 3
    names = [p["name"] for p in plans]
    assert "Free" in names
    assert "Pro" in names
    assert "Enterprise" in names

    pro = next(p for p in plans if p["name"] == "Pro")
    assert pro["price"] == 399
    assert pro["currency"] == "INR"

    enterprise = next(p for p in plans if p["name"] == "Enterprise")
    assert enterprise["price"] == 1499


def test_subscribe_requires_auth(client):
    resp = client.post("/api/payments/subscribe", json={"plan": "pro"})
    assert resp.status_code == 401


@patch("app.routers.payments.create_subscription")
def test_subscribe_creates_subscription(mock_create, client, db_session):
    mock_create.return_value = {
        "id": "sub_test123",
        "plan_id": "plan_test_pro",
        "status": "created",
    }

    token = _register(client)
    resp = client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["subscription_id"] == "sub_test123"
    assert data["plan"] == "pro"
    assert data["amount"] == 39900

    mock_create.assert_called_once()


@patch("app.routers.payments.create_subscription")
def test_subscribe_invalid_plan(mock_create, client, db_session):
    token = _register(client)
    resp = client.post(
        "/api/payments/subscribe",
        json={"plan": "invalid"},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 422


@patch("app.routers.payments.create_subscription")
def test_subscribe_already_on_plan(mock_create, client, db_session):
    from app.models.user import User
    token = _register(client)

    user = db_session.query(User).filter_by(email="pay@example.com").first()
    user.plan = "pro"
    db_session.commit()

    resp = client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 400
    assert "already on" in resp.json()["detail"].lower()


@patch("app.routers.payments.verify_payment_signature")
@patch("app.routers.payments.create_subscription")
def test_verify_payment_success(mock_create, mock_verify, client, db_session):
    mock_create.return_value = {
        "id": "sub_verify123",
        "plan_id": "plan_test_pro",
        "status": "created",
    }
    mock_verify.return_value = True

    token = _register(client, email="verify@example.com")

    client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )

    resp = client.post(
        "/api/payments/verify",
        json={
            "razorpay_subscription_id": "sub_verify123",
            "razorpay_payment_id": "pay_test123",
            "razorpay_signature": "sig_test123",
        },
        headers=_auth_headers(token),
    )
    assert resp.status_code == 200
    assert resp.json()["plan"] == "pro"

    me_resp = client.get("/api/auth/me", headers=_auth_headers(token))
    assert me_resp.json()["plan"] == "pro"


@patch("app.routers.payments.verify_payment_signature")
@patch("app.routers.payments.create_subscription")
def test_verify_payment_invalid_signature(mock_create, mock_verify, client, db_session):
    mock_create.return_value = {
        "id": "sub_badsig123",
        "plan_id": "plan_test_pro",
        "status": "created",
    }
    mock_verify.return_value = False

    token = _register(client, email="badsig@example.com")

    client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )

    resp = client.post(
        "/api/payments/verify",
        json={
            "razorpay_subscription_id": "sub_badsig123",
            "razorpay_payment_id": "pay_bad",
            "razorpay_signature": "bad_sig",
        },
        headers=_auth_headers(token),
    )
    assert resp.status_code == 400
    assert "signature" in resp.json()["detail"].lower()


def test_get_subscription_none(client, db_session):
    token = _register(client, email="nosub@example.com")
    resp = client.get("/api/payments/subscription", headers=_auth_headers(token))
    assert resp.status_code == 200
    assert resp.json() is None


@patch("app.routers.payments.create_subscription")
def test_get_subscription_exists(mock_create, client, db_session):
    mock_create.return_value = {
        "id": "sub_exists123",
        "plan_id": "plan_test_pro",
        "status": "created",
    }

    token = _register(client, email="hassub@example.com")
    client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )

    resp = client.get("/api/payments/subscription", headers=_auth_headers(token))
    assert resp.status_code == 200
    data = resp.json()
    assert data["razorpay_subscription_id"] == "sub_exists123"
    assert data["plan"] == "pro"


@patch("app.routers.payments.cancel_subscription")
@patch("app.routers.payments.verify_payment_signature")
@patch("app.routers.payments.create_subscription")
def test_cancel_subscription(mock_create, mock_verify, mock_cancel, client, db_session):
    mock_create.return_value = {
        "id": "sub_cancel123",
        "plan_id": "plan_test_pro",
        "status": "created",
    }
    mock_verify.return_value = True
    mock_cancel.return_value = {"status": "cancelled"}

    token = _register(client, email="cancel@example.com")

    client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )

    client.post(
        "/api/payments/verify",
        json={
            "razorpay_subscription_id": "sub_cancel123",
            "razorpay_payment_id": "pay_cancel",
            "razorpay_signature": "sig_cancel",
        },
        headers=_auth_headers(token),
    )

    resp = client.post("/api/payments/cancel", headers=_auth_headers(token))
    assert resp.status_code == 200
    assert resp.json()["status"] == "cancelled"

    me_resp = client.get("/api/auth/me", headers=_auth_headers(token))
    assert me_resp.json()["plan"] == "free"


def test_cancel_no_active_subscription(client, db_session):
    token = _register(client, email="noactive@example.com")
    resp = client.post("/api/payments/cancel", headers=_auth_headers(token))
    assert resp.status_code == 400
    assert "no active" in resp.json()["detail"].lower()


@patch("app.routers.payments.verify_webhook_signature")
def test_webhook_subscription_activated(mock_verify_webhook, client, db_session):
    mock_verify_webhook.return_value = True

    from app.models.subscription import Subscription, SubscriptionStatus
    from app.models.user import User

    user = User(
        email="webhook@example.com",
        hashed_password="hashed",
        name="Webhook User",
    )
    db_session.add(user)
    db_session.flush()

    sub = Subscription(
        user_id=user.id,
        razorpay_subscription_id="sub_webhook_act",
        razorpay_plan_id="plan_pro",
        plan="pro",
        status=SubscriptionStatus.CREATED,
        amount=39900,
    )
    db_session.add(sub)
    db_session.commit()

    event_data = {
        "event": "subscription.activated",
        "payload": {
            "subscription": {
                "entity": {"id": "sub_webhook_act"},
            },
        },
    }

    resp = client.post(
        "/api/payments/webhook",
        content=json.dumps(event_data),
        headers={
            "Content-Type": "application/json",
            "X-Razorpay-Signature": "test_sig",
        },
    )
    assert resp.status_code == 200

    db_session.refresh(sub)
    assert sub.status == SubscriptionStatus.ACTIVE

    db_session.refresh(user)
    assert user.plan == "pro"


@patch("app.routers.payments.verify_webhook_signature")
def test_webhook_subscription_cancelled(mock_verify_webhook, client, db_session):
    mock_verify_webhook.return_value = True

    from app.models.subscription import Subscription, SubscriptionStatus
    from app.models.user import User

    user = User(
        email="webhookcancel@example.com",
        hashed_password="hashed",
        name="Webhook Cancel",
    )
    db_session.add(user)
    db_session.flush()

    sub = Subscription(
        user_id=user.id,
        razorpay_subscription_id="sub_webhook_cancel",
        razorpay_plan_id="plan_pro",
        plan="pro",
        status=SubscriptionStatus.ACTIVE,
        amount=39900,
    )
    db_session.add(sub)
    user.plan = "pro"
    db_session.commit()

    event_data = {
        "event": "subscription.cancelled",
        "payload": {
            "subscription": {
                "entity": {"id": "sub_webhook_cancel"},
            },
        },
    }

    resp = client.post(
        "/api/payments/webhook",
        content=json.dumps(event_data),
        headers={
            "Content-Type": "application/json",
            "X-Razorpay-Signature": "test_sig",
        },
    )
    assert resp.status_code == 200

    db_session.refresh(sub)
    assert sub.status == SubscriptionStatus.CANCELLED

    db_session.refresh(user)
    assert user.plan == "free"


@patch("app.routers.payments.verify_webhook_signature")
def test_webhook_invalid_signature(mock_verify_webhook, client):
    mock_verify_webhook.return_value = False

    resp = client.post(
        "/api/payments/webhook",
        content=json.dumps({"event": "test"}),
        headers={
            "Content-Type": "application/json",
            "X-Razorpay-Signature": "bad",
        },
    )
    assert resp.status_code == 400


def test_verify_payment_signature_function():
    from app.services.razorpay_service import verify_payment_signature

    with patch("app.services.razorpay_service.settings") as mock_settings:
        mock_settings.razorpay_key_secret = "test_secret"

        payment_id = "pay_123"
        sub_id = "sub_456"
        message = f"{payment_id}|{sub_id}"
        expected_sig = hmac.new(
            b"test_secret",
            message.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

        assert verify_payment_signature(sub_id, payment_id, expected_sig) is True
        assert verify_payment_signature(sub_id, payment_id, "wrong_sig") is False


def test_verify_webhook_signature_function():
    from app.services.razorpay_service import verify_webhook_signature

    with patch("app.services.razorpay_service.settings") as mock_settings:
        mock_settings.razorpay_webhook_secret = "webhook_secret"

        body = b'{"event": "test"}'
        expected_sig = hmac.new(
            b"webhook_secret",
            body,
            hashlib.sha256,
        ).hexdigest()

        assert verify_webhook_signature(body, expected_sig) is True
        assert verify_webhook_signature(body, "wrong_sig") is False


def test_enterprise_plan_subscribe(client, db_session):
    """Enterprise plan should be subscribable."""
    token = _register(client, email="enterprise@example.com")

    with patch("app.routers.payments.create_subscription") as mock_create:
        mock_create.return_value = {
            "id": "sub_ent123",
            "plan_id": "plan_test_enterprise",
            "status": "created",
        }

        resp = client.post(
            "/api/payments/subscribe",
            json={"plan": "enterprise"},
            headers=_auth_headers(token),
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["plan"] == "enterprise"
        assert data["amount"] == 149900


@patch("app.routers.payments.create_subscription")
def test_duplicate_active_subscription_blocked(mock_create, client, db_session):
    mock_create.return_value = {
        "id": "sub_dup1",
        "plan_id": "plan_test_pro",
        "status": "created",
    }

    token = _register(client, email="dup@example.com")
    resp1 = client.post(
        "/api/payments/subscribe",
        json={"plan": "pro"},
        headers=_auth_headers(token),
    )
    assert resp1.status_code == 200

    resp2 = client.post(
        "/api/payments/subscribe",
        json={"plan": "enterprise"},
        headers=_auth_headers(token),
    )
    assert resp2.status_code == 400
    assert "active subscription" in resp2.json()["detail"].lower()
