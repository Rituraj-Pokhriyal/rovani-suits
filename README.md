# ROVANI — Bespoke Tailoring

Ultra-premium bespoke suit shop. Configure your suit live in 3D, take your own measurements, and place an order for your tailor.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS v3 · Framer Motion · Three.js / R3F · Zustand · Lenis

---

## Running locally

```bash
npm install
npm run dev          # → http://localhost:3002
```

> **Port note:** ROVANI runs on **3002**. The portfolio project uses 3000. Don't mix them — the CSS will be wrong if you open ROVANI at port 3000.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured collection, process, measure teaser, lookbook teaser, testimonials, bespoke CTA |
| `/collections` | Product grid with category + fabric filters |
| `/bespoke` | 5-step suit builder with live 3D preview |
| `/measure` | Self-measurement guide (16 measurements, SVG diagram) |
| `/lookbook` | Editorial grid + craftsmanship section |

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              Root layout — fonts, cart drawer, cursor, smooth scroll
│   ├── page.tsx                Home page
│   ├── bespoke/page.tsx
│   ├── collections/page.tsx
│   ├── lookbook/page.tsx
│   └── measure/page.tsx
│
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx     GSAP + Framer Motion hero
│   │   ├── MarqueeStrip.tsx
│   │   ├── FeaturedCollection.tsx
│   │   ├── TheProcess.tsx
│   │   ├── MeasureTeaser.tsx   "Measure yourself before we meet" section
│   │   ├── LookbookTeaser.tsx
│   │   ├── Testimonials.tsx
│   │   └── BespokeCTA.tsx
│   │
│   ├── bespoke/
│   │   └── BespokePage.tsx     5-step wizard + 3D preview (two-column layout)
│   │
│   ├── collections/
│   │   └── CollectionsPage.tsx Filter grid
│   │
│   ├── lookbook/
│   │   └── LookbookPage.tsx
│   │
│   ├── measure/
│   │   ├── MeasurePage.tsx     Main measure page
│   │   ├── BodyDiagram.tsx     SVG figure with 16 clickable hotspots
│   │   └── MeasurementGuide.tsx Expandable instruction cards
│   │
│   ├── three/
│   │   └── SuitConfigurator.tsx Three.js procedural 3D suit (R3F canvas)
│   │
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── CartDrawer.tsx
│       ├── CustomCursor.tsx
│       └── SmoothScroll.tsx
│
├── lib/
│   ├── data/
│   │   ├── fabrics.ts          Fabric options, styles, button/vent/lining choices
│   │   ├── measurements.ts     16 measurement definitions with tips + SVG coords
│   │   └── products.ts         Ready-to-wear catalogue
│   │
│   ├── store/
│   │   ├── cartStore.ts        Zustand cart (add, remove, qty, open/close drawer)
│   │   └── measurementStore.ts Zustand measurements (Zustand persist → localStorage)
│   │
│   └── utils.ts                formatINR helper
│
└── app/globals.css             Tailwind base + custom utilities (gold-text, serif, etc.)
```

---

## 3D Suit Configurator

**File:** `src/components/three/SuitConfigurator.tsx`

Procedural geometry, no external 3D models:

| Part | Geometry |
|------|----------|
| Jacket body | `ExtrudeGeometry` — trapezoid shape, wider at shoulders |
| Lapels | `ExtrudeGeometry` — notch (step V) or peak (upward triangle) variants |
| Sleeves ×2 | `TubeGeometry` via `CatmullRomCurve3` with slight taper |
| Shoulder pads ×2 | `BoxGeometry` |
| Buttons | `SphereGeometry` — 2 or 3 depending on selection |
| Chest pocket | `BoxGeometry` flap |
| Hip pockets ×2 | `BoxGeometry` |
| Shirt collar | Thin white plane in neck opening |

**Fabric textures** are generated at runtime via an `OffscreenCanvas` (256×256, 4× tiling):
- Super 150s Wool → diagonal twill lines
- Harris Tweed → herringbone chevrons
- Italian Linen / Cashmere → plain weave

**Controls:** `OrbitControls` with auto-rotate (speed 0.5), pan/zoom disabled, polar angle clamped to 70°–110°.

**Dynamic updates:** each selection (style, colour, buttons, lining) updates the live 3D mesh immediately.

---

## Self-Measurement System

**Files:** `src/components/measure/`, `src/lib/data/measurements.ts`, `src/lib/store/measurementStore.ts`

16 measurements: Height, Chest, Waist, Seat/Hips, Shoulder, Back Length, Jacket Length, Sleeve, Bicep, Wrist, Neck + Trouser Waist, Seat, Thigh, Inseam, Outseam.

Each has:
- Range validation (amber warning if outside typical range)
- Step-by-step tip
- Common mistake callout
- SVG hotspot position (percentage-based) for the body diagram

Measurements persist to **localStorage** via Zustand `persist` middleware. The bespoke builder Step 3 reads from the store and shows a "Measurements loaded ✓" banner.

---

## Zustand Stores

### `cartStore`
```ts
{ items, addItem, removeItem, updateQty, clearCart, openCart, closeCart, total(), count() }
```
`addItem` auto-opens the cart drawer. Cart state is **not** persisted (clears on refresh — intentional for a pre-consultation flow).

### `measurementStore`
```ts
{ measurements, fitPreference, setMeasurement, setAll, clearAll, isComplete, completedCount }
```
Persisted to localStorage under key `"rovani-measurements"`.

---

## Styling conventions

| Class | Defined in | Purpose |
|-------|-----------|---------|
| `.serif` | globals.css | Cormorant Garamond font |
| `.gold-text` | globals.css | Gold gradient text fill |
| `.section-label` | globals.css | Small-caps tracking label |
| `.fabric-overlay` | globals.css | Subtle diagonal weave texture |
| `.gold-divider` | globals.css | Horizontal gradient separator |
| `.step-active` | globals.css | Selected state for bespoke step cards |
| `.card-lift` | globals.css | Hover lift + shadow on cards |
| `cream`, `gold`, `charcoal` | tailwind.config.ts | Brand colours |

---

## Product roadmap

### Now (done)
- [x] 3D suit configurator with real-time updates
- [x] Self-measurement guide (16 fields, illustrated)
- [x] Zustand measurement persistence
- [x] Two-column bespoke builder layout

### Next
- [ ] Product detail pages (`/collections/[slug]`)
- [ ] Checkout page (order summary + contact form)
- [ ] Appointment booking form
- [ ] WhatsApp floating CTA button

### Later
- [ ] Razorpay payment integration
- [ ] User accounts + saved measurement profiles (NextAuth + DB)
- [ ] Order status tracking page
- [ ] Admin panel (orders + customers)
- [ ] Fabric sample request
- [ ] Size recommendation quiz

---

## Deploy

The site exports as a fully static build (`output: "export"`):

```bash
npm run build    # generates /out
```

Planned deployment: **Vercel** (subdomain or custom domain).  
GitHub Pages was disabled (subdirectory hosting requires `basePath` config changes; skipped for now).

---

## Git

```
github.com/Rituraj-Pokhriyal/rovani-suits
branch: main
```

Never commit `Co-Authored-By: Claude` — all commits under Rituraj's identity only.
