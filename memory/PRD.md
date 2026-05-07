# HS FITNESS — Premium E-commerce Catalog

## Original Problem Statement
Build an ultra-premium e-commerce catalog for HS FITNESS, an Indian commercial fitness equipment manufacturer. Dark + Red luxury theme. NO PRICE shown anywhere. WhatsApp-driven enquiry flow.

## Architecture
- **Backend**: FastAPI + MongoDB. JWT-protected admin endpoints.
- **Frontend**: React (CRA + craco) + TailwindCSS + Shadcn UI. Anton (display) + DM Sans (body) Google Fonts.
- **Auth**: Single admin via env-driven credentials, JWT (HS256) for 7 days.

## User Personas
- **Gym owner / studio buyer** (primary visitor): browses catalog → enquires via WhatsApp / phone.
- **Brand owner (admin)**: logs in to /admin to manage products, gallery, and view enquiries.

## Core Requirements (static)
- Sticky premium header with logo + WhatsApp CTA
- Hero: "STRONG EQUIPMENT, STRONGER YOU" + cinematic dark gym BG
- Products grid: image, name, description, tag (Best Seller / Premium / Top Rated), Contact for Price + WhatsApp buttons. NO PRICE.
- Premium gallery: hover overlay shows phone +91 9717648894 + WhatsApp icon
- Categories: Cardio, Strength, Machines, Plates
- Why Choose Us (4 cards), Reviews (4 testimonials with exact text)
- Contact: form (Name, Phone, Email, Message), Google Map embed, WhatsApp big CTA
- Floating WhatsApp button (premium gradient + pulse)
- Admin panel: products CRUD, gallery CRUD, enquiry inbox

## Implemented (May 2026)
- ✅ FastAPI server with seed data, JWT auth, full CRUD APIs, MongoDB persistence
- ✅ Dark/red luxury theme with Anton + DM Sans, glassmorphism, red blade accents
- ✅ Sticky header with mobile drawer + premium WhatsApp button (gradient + white icon disc)
- ✅ Hero with bold display headline, stats strip, scroll indicator
- ✅ 10 products + 10 gallery items seeded with uploaded HS Fitness Discovery Series photos:
  Multi Press, Shoulder Press, Horizontal Pulley, Leg Extension, Lat Pull Down | Row,
  CHG 200C Multi Home Gym, Leg Extension | Leg Curl, Lying Leg Curl, Upper Limbs Assist, Rear Delt | Pec Fly
- ✅ Premium upgraded WhatsApp buttons site-wide (header, hero, product cards, gallery overlay, contact, floating, footer) — gradient + shimmer + white-disc brand icon
- ✅ Contact form → POST /api/contact → toast → auto-opens wa.me chat with pre-filled message
- ✅ Floating WhatsApp pulse button (expanded "Chat on WhatsApp" on desktop)
- ✅ Google Map embed pointed to Priyadarshini Vihar address
- ✅ Admin login + dashboard (Products / Gallery / Enquiries tabs) with full CRUD UI
- ✅ All interactive elements have data-testid
- ✅ Iteration 1 testing: 14/14 backend + all critical frontend flows PASS

## Backlog (P0/P1/P2)
- [P1] Awaiting more product images from user — to be added via admin panel or seeded
- [P1] Catalog image with baked-in prices (WA0025) — needs price-cropped version before adding
- [P2] Email notifications for contact submissions (SendGrid/Resend integration)
- [P2] WhatsApp Business API auto-notifications on form submit (Twilio)
- [P2] Image upload directly to admin (currently URL-based) via object storage
- [P3] SEO: Open Graph tags, schema.org Product structured data
- [P3] Newsletter capture in footer
- [P3] Multilingual (Hindi) toggle

## Test Credentials
- Admin: `admin@hsfitness.com` / `HSFitness@2026`
- Login URL: `/admin/login` → redirects to `/admin`
