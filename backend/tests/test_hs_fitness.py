"""Backend API tests for HS Fitness e-commerce site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://hs-fitness-premium.preview.emergentagent.com').rstrip('/')
ADMIN_EMAIL = "admin@hsfitness.com"
ADMIN_PASSWORD = "HSFitness@2026"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 10
    assert data["email"] == ADMIN_EMAIL
    return data["token"]


@pytest.fixture
def admin_api(api, admin_token):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "Authorization": f"Bearer {admin_token}"})
    return s


# ---------- Public endpoints ----------
class TestPublic:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "HS" in r.json().get("message", "")

    def test_products_list(self, api):
        r = api.get(f"{BASE_URL}/api/products")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 6, f"Expected >=6 seeded products, got {len(items)}"
        names = [p["name"] for p in items]
        for expected in ["Multi Press", "Shoulder Press", "Horizontal Pulley",
                         "Leg Extension", "Lat Pull Down | Row", "CHG 200C Multi Home Gym"]:
            assert expected in names, f"Missing seeded product: {expected}"
        for p in items:
            assert "_id" not in p
            assert p["image_url"].startswith("http")
            assert "id" in p and "name" in p and "category" in p

    def test_gallery_list(self, api):
        r = api.get(f"{BASE_URL}/api/gallery")
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 6
        for g in items:
            assert "_id" not in g
            assert g["image_url"].startswith("http")

    def test_contact_create_persists(self, api, admin_api):
        payload = {
            "name": "TEST_QA_User",
            "phone": "+919999999999",
            "message": "TEST contact submission - please ignore",
            "email": "test_qa@example.com",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "_id" not in data
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert "id" in data
        cid = data["id"]

        # Verify persistence via admin contacts endpoint
        rl = admin_api.get(f"{BASE_URL}/api/admin/contacts")
        assert rl.status_code == 200
        contacts = rl.json()
        assert any(c["id"] == cid for c in contacts), "Submitted contact not persisted"

    def test_contact_email_optional(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_NoEmail", "phone": "+911234567890", "message": "no email"
        })
        assert r.status_code == 200
        assert r.json()["email"] is None


# ---------- Admin auth ----------
class TestAdminAuth:
    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code == 401

    def test_login_wrong_email(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"email": "x@y.com", "password": ADMIN_PASSWORD})
        assert r.status_code == 401

    def test_me_no_token(self, api):
        r = requests.get(f"{BASE_URL}/api/admin/me")
        assert r.status_code == 401

    def test_me_with_token(self, admin_api):
        r = admin_api.get(f"{BASE_URL}/api/admin/me")
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_me_with_bad_token(self, api):
        r = requests.get(f"{BASE_URL}/api/admin/me", headers={"Authorization": "Bearer not-a-jwt"})
        assert r.status_code == 401

    def test_admin_endpoints_require_auth(self, api):
        # contacts list without token should be 401
        r = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert r.status_code == 401


# ---------- Product CRUD ----------
class TestProductsCRUD:
    def test_full_crud_flow(self, admin_api, api):
        # CREATE
        payload = {
            "name": f"TEST_Product_{uuid.uuid4().hex[:6]}",
            "description": "Test product",
            "category": "Strength",
            "image_url": "https://example.com/img.jpg",
            "tag": "Premium",
            "order": 99,
        }
        r = admin_api.post(f"{BASE_URL}/api/admin/products", json=payload)
        assert r.status_code == 200, r.text
        created = r.json()
        pid = created["id"]
        assert created["name"] == payload["name"]
        assert "_id" not in created

        # GET single via public route
        rg = api.get(f"{BASE_URL}/api/products/{pid}")
        assert rg.status_code == 200
        assert rg.json()["name"] == payload["name"]

        # UPDATE
        ru = admin_api.put(f"{BASE_URL}/api/admin/products/{pid}",
                           json={"name": payload["name"] + "_upd", "tag": "Top Rated"})
        assert ru.status_code == 200
        assert ru.json()["name"].endswith("_upd")
        assert ru.json()["tag"] == "Top Rated"

        # Verify persistence via list
        rl = api.get(f"{BASE_URL}/api/products")
        assert any(p["id"] == pid and p["name"].endswith("_upd") for p in rl.json())

        # DELETE
        rd = admin_api.delete(f"{BASE_URL}/api/admin/products/{pid}")
        assert rd.status_code == 200

        # Verify gone
        rg2 = api.get(f"{BASE_URL}/api/products/{pid}")
        assert rg2.status_code == 404

    def test_create_without_auth(self, api):
        r = requests.post(f"{BASE_URL}/api/admin/products", json={
            "name": "x", "description": "x", "category": "x", "image_url": "x"
        })
        assert r.status_code == 401


# ---------- Gallery CRUD ----------
class TestGalleryCRUD:
    def test_full_flow(self, admin_api, api):
        payload = {"name": f"TEST_Gallery_{uuid.uuid4().hex[:6]}",
                   "image_url": "https://example.com/g.jpg", "order": 50}
        r = admin_api.post(f"{BASE_URL}/api/admin/gallery", json=payload)
        assert r.status_code == 200
        gid = r.json()["id"]

        ru = admin_api.put(f"{BASE_URL}/api/admin/gallery/{gid}",
                           json={"name": payload["name"] + "_upd"})
        assert ru.status_code == 200
        assert ru.json()["name"].endswith("_upd")

        rl = api.get(f"{BASE_URL}/api/gallery")
        assert any(g["id"] == gid for g in rl.json())

        rd = admin_api.delete(f"{BASE_URL}/api/admin/gallery/{gid}")
        assert rd.status_code == 200

        rd2 = admin_api.delete(f"{BASE_URL}/api/admin/gallery/{gid}")
        assert rd2.status_code == 404
