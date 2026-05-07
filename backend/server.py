from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ----------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
JWT_SECRET = os.environ.get('JWT_SECRET', 'hs-fitness-super-secret-change-me-2026')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@hsfitness.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'HSFitness@2026')
JWT_ALGORITHM = 'HS256'
JWT_EXP_HOURS = 24 * 7  # 7 days

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="HS Fitness API")
api_router = APIRouter(prefix="/api")
bearer_scheme = HTTPBearer(auto_error=False)

# ----------------------------------------------------------------------
# Models
# ----------------------------------------------------------------------
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str  # Cardio, Strength, Machines, Plates
    image_url: str
    tag: str = "Premium"  # Best Seller / Premium / Top Rated
    order: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    image_url: str
    tag: str = "Premium"
    order: int = 0

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    tag: Optional[str] = None
    order: Optional[int] = None

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    image_url: str
    order: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class GalleryImageCreate(BaseModel):
    name: str
    image_url: str
    order: int = 0

class GalleryImageUpdate(BaseModel):
    name: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    message: str
    email: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    name: str
    phone: str
    message: str
    email: Optional[str] = None

class AdminLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    token: str
    email: str

# ----------------------------------------------------------------------
# Auth helpers
# ----------------------------------------------------------------------
def create_token(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if creds is None:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("email") != ADMIN_EMAIL:
            raise HTTPException(status_code=403, detail="Not authorized")
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ----------------------------------------------------------------------
# Seed data
# ----------------------------------------------------------------------
LOGO_URL = "https://customer-assets.emergentagent.com/job_ef732ca6-c14e-4250-bbc8-4f4cf1247ef8/artifacts/sowj2soz_IMG_20260502_111753_715.jpg"

SEED_PRODUCTS = [
    {
        "name": "Multi Press",
        "description": "Premium HS Fitness Discovery Series multi-press station for chest, shoulders and triceps. Heavy-duty commercial build.",
        "category": "Machines",
        "image_url": "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/zfe9b44q_IMG-20260502-WA0030.jpg",
        "tag": "Best Seller",
        "order": 1,
    },
    {
        "name": "Shoulder Press",
        "description": "Biomechanically tuned Discovery Series shoulder press with heavy-duty weight stack. Built for commercial gyms.",
        "category": "Strength",
        "image_url": "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/dvpzs6v0_IMG-20260502-WA0032.jpg",
        "tag": "Premium",
        "order": 2,
    },
    {
        "name": "Horizontal Pulley",
        "description": "Discovery Series low-row horizontal cable pulley station for back thickness and lat engagement.",
        "category": "Machines",
        "image_url": "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/ak3vbw22_IMG-20260502-WA0033.jpg",
        "tag": "Top Rated",
        "order": 3,
    },
    {
        "name": "Leg Extension",
        "description": "Quad-isolation Discovery Series leg extension with smooth cam profile and dual-density pads.",
        "category": "Strength",
        "image_url": "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/1bqrymha_IMG-20260502-WA0034.jpg",
        "tag": "Premium",
        "order": 4,
    },
    {
        "name": "Lat Pull Down | Row",
        "description": "Dual-purpose lat pulldown and seated row station from the Discovery Series – a strength cornerstone.",
        "category": "Machines",
        "image_url": "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/4naka8cn_IMG-20260502-WA0031.jpg",
        "tag": "Best Seller",
        "order": 5,
    },
    {
        "name": "CHG 200C Multi Home Gym",
        "description": "All-in-one multi-station home gym covering full body training with premium padded stations.",
        "category": "Strength",
        "image_url": "https://customer-assets.emergentagent.com/job_ef732ca6-c14e-4250-bbc8-4f4cf1247ef8/artifacts/p88hgf3x_IMG-20260502-WA0038.jpg",
        "tag": "Premium",
        "order": 6,
    },
]

async def seed_data():
    # Seed products if empty
    count = await db.products.count_documents({})
    if count == 0:
        docs = [Product(**p).model_dump() for p in SEED_PRODUCTS]
        await db.products.insert_many(docs)
        logging.info(f"Seeded {len(docs)} products")

    # Seed gallery with same products (can be managed separately by admin)
    gcount = await db.gallery.count_documents({})
    if gcount == 0:
        gdocs = [GalleryImage(name=p["name"], image_url=p["image_url"], order=p["order"]).model_dump()
                 for p in SEED_PRODUCTS]
        await db.gallery.insert_many(gdocs)
        logging.info(f"Seeded {len(gdocs)} gallery images")

# ----------------------------------------------------------------------
# Routes - Public
# ----------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "HS Fitness API", "brand": "HS FITNESS"}

@api_router.get("/products", response_model=List[Product])
async def list_products():
    items = await db.products.find({}, {"_id": 0}).sort("order", 1).to_list(500)
    return items

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    item = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    return item

@api_router.get("/gallery", response_model=List[GalleryImage])
async def list_gallery():
    items = await db.gallery.find({}, {"_id": 0}).sort("order", 1).to_list(500)
    return items

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(payload: ContactCreate):
    sub = ContactSubmission(**payload.model_dump())
    doc = sub.model_dump()
    await db.contacts.insert_one(doc)
    logging.info(f"New contact submission from {sub.name} ({sub.phone})")
    return sub

# ----------------------------------------------------------------------
# Routes - Admin (JWT required)
# ----------------------------------------------------------------------
@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(body: AdminLogin):
    if body.email.strip().lower() != ADMIN_EMAIL.lower():
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenResponse(token=create_token(ADMIN_EMAIL), email=ADMIN_EMAIL)

@api_router.get("/admin/me")
async def admin_me(admin=Depends(require_admin)):
    return {"email": admin["email"]}

@api_router.get("/admin/contacts", response_model=List[ContactSubmission])
async def list_contacts(admin=Depends(require_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items

@api_router.post("/admin/products", response_model=Product)
async def admin_create_product(payload: ProductCreate, admin=Depends(require_admin)):
    p = Product(**payload.model_dump())
    await db.products.insert_one(p.model_dump())
    return p

@api_router.put("/admin/products/{product_id}", response_model=Product)
async def admin_update_product(product_id: str, payload: ProductUpdate, admin=Depends(require_admin)):
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.products.find_one_and_update(
        {"id": product_id}, {"$set": update}, return_document=True
    )
    if not res:
        raise HTTPException(status_code=404, detail="Product not found")
    item = await db.products.find_one({"id": product_id}, {"_id": 0})
    return item

@api_router.delete("/admin/products/{product_id}")
async def admin_delete_product(product_id: str, admin=Depends(require_admin)):
    res = await db.products.delete_one({"id": product_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True}

@api_router.post("/admin/gallery", response_model=GalleryImage)
async def admin_create_gallery(payload: GalleryImageCreate, admin=Depends(require_admin)):
    g = GalleryImage(**payload.model_dump())
    await db.gallery.insert_one(g.model_dump())
    return g

@api_router.put("/admin/gallery/{image_id}", response_model=GalleryImage)
async def admin_update_gallery(image_id: str, payload: GalleryImageUpdate, admin=Depends(require_admin)):
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.gallery.find_one_and_update(
        {"id": image_id}, {"$set": update}, return_document=True
    )
    if not res:
        raise HTTPException(status_code=404, detail="Image not found")
    item = await db.gallery.find_one({"id": image_id}, {"_id": 0})
    return item

@api_router.delete("/admin/gallery/{image_id}")
async def admin_delete_gallery(image_id: str, admin=Depends(require_admin)):
    res = await db.gallery.delete_one({"id": image_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"ok": True}

# ----------------------------------------------------------------------
# App setup
# ----------------------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def on_startup():
    await seed_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
