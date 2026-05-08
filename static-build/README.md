# HS FITNESS — Static Website

A pure HTML / CSS / JS production-ready site. **No build tools, no npm, no server required.** Drop it on GitHub Pages, Netlify, Vercel, or any static host.

## 📁 What's inside

```
hs-fitness-static/
├── index.html         ← the entire site
├── css/
│   └── styles.css     ← custom styles (animations, glow, marquee, etc.)
├── js/
│   ├── data.js        ← all products, gallery, brands, reviews, brand info
│   └── main.js        ← rendering + form + smooth scroll + interactions
├── assets/
│   ├── logo.jpg       ← HS FITNESS logo (used in header / footer / hero)
│   └── hero-bg.jpg    ← cinematic gym hero background
└── README.md
```

> Tailwind CSS is loaded from a CDN (`<script src="https://cdn.tailwindcss.com">`) so there is **no build step**. Lucide icons + Google Fonts (Anton + DM Sans) are also loaded from CDN.

## 🚀 Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `hs-fitness`).
2. Upload **all files inside this folder** to the repo root (not the folder itself — the contents).
3. Go to **Settings → Pages → Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`**, folder: **`/ (root)`**
4. Save. Your site will be live at:
   ```
   https://<your-username>.github.io/hs-fitness/
   ```

That's it.

## 🌐 Deploy elsewhere (Netlify / Vercel / Cloudflare Pages)

Drag-and-drop the folder onto the dashboard. No build command needed. Publish directory: `.`

## 🛠️ How to update content

All content lives in **`js/data.js`** — open it in any text editor. No tools needed. Changes are reflected instantly.

### Add or edit a product
```js
products: [
  {
    id: "unique-id-here",
    name: "Multi Press",
    description: "Premium HS Fitness Discovery Series multi-press station…",
    category: "Machines",          // Cardio / Strength / Machines / Plates
    image_url: "https://....jpg",  // any public image URL
    tag: "Best Seller",            // Best Seller / Premium / Top Rated
    order: 1                       // lower = shown first
  },
  …
]
```

### Add a brand logo to "Brands We Deal In"
```js
brands: [
  { name: "Life Fitness",   note: "Authorized Dealer", logo_url: "assets/brands/life-fitness.png" },
  …
]
```
If `logo_url` is set, the card automatically swaps from text to logo with the grayscale → color hover effect.

### Change phone numbers / Gmail / Instagram
Edit the `brand` object in `data.js`.

### Replace logo / hero background
Drop new files into `assets/` keeping the names `logo.jpg` and `hero-bg.jpg`, or update the paths in `index.html`.

## 📞 Contact form

The contact form is fully client-side. On submit it pre-fills a WhatsApp message with the user's name + phone + message and opens `wa.me/919217178894` in a new tab. **No server needed.**

If you ever want to capture submissions to a database or email, plug in any free form service:
- **Formspree** (`<form action="https://formspree.io/f/xxxxxxx" method="POST">`)
- **Getform**, **Web3Forms**, **Formsubmit**, **Basin** etc.
- Or wire up the existing FastAPI/MongoDB backend by changing the submit handler in `js/main.js`.

## ✨ Features preserved from the React build

- Sticky header with blur on scroll
- Hero with cinematic background + Anton display font
- Red ticker marquee
- 25 products in 3-column responsive grid · No price · Contact + WhatsApp buttons
- 4 categories with HD images
- 25 gallery items with hover overlay (phone + WhatsApp icon)
- "Why Choose Us" 4-card grid
- "Brands We Deal In" with grayscale → color hover
- 4 testimonial cards
- Contact section: form + 3 phones + Gmail + Instagram + Google Map embed
- Premium footer with Instagram gradient icon
- Floating WhatsApp button with breathing glow + pulse
- All WhatsApp buttons use the **official WhatsApp brand icon** with a glossy gradient + breathing glow halo + shimmer-on-hover

## 🎨 Brand assets

- Colors: `#0A0A0A` background · `#DC1F26` red · `#25D366 → #128C7E` WhatsApp gradient
- Fonts: Anton (display, headings) · DM Sans (body)
- Logo: `assets/logo.jpg` (replace anytime)

## 🔒 Browser support

Modern Chrome / Safari / Firefox / Edge. Works on mobile and desktop. Gracefully degrades on older browsers (animations only).

---

**HS FITNESS™** · Strong Equipment, Stronger You.
