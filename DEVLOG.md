# ROVANI — Dev Log & Chat Reference

Running record of decisions, bugs, and build history. Updated as the project evolves.

---

## Sessions

### Session 1 — Initial build (May 2026)

**Goal:** Build a premium bespoke suit e-commerce site from scratch.

**Decisions made:**
- Name: **ROVANI** (picked by Rituraj from options)
- Framework: Next.js 15 + TypeScript, `output: "export"` (static)
- Style: Light & minimal, champagne gold accent (`#C9A96E`), Cormorant Garamond serif
- Features: Collections page, 5-step bespoke builder, Zustand cart drawer, Lookbook, cinematic Framer Motion animations
- Fonts: Cormorant Garamond (serif display) + Inter (body/UI) via `next/font/google`
- Colour palette: cream `#FAFAF8`, gold `#C9A96E`, charcoal `#0A0A0A`
- Animation: GSAP ScrollTrigger on hero, Framer Motion for component transitions, Lenis smooth scroll

**What was built:**
- Complete site: home (7 sections), collections, bespoke wizard (5 steps), lookbook
- Zustand cart store with slide-in CartDrawer
- Custom cursor (dot + ring with hover expansion)
- GSAP hero text timeline
- Product catalogue with filter system (category + fabric)
- Fabric/style/detail data layer in `src/lib/data/fabrics.ts` and `products.ts`

**Repo:** `github.com/Rituraj-Pokhriyal/rovani-suits` — committed but GitHub Pages disabled.

**Why Pages was disabled:** Next.js static export with `output: "export"` deployed to a subdirectory (`/rovani-suits/`) requires `basePath: '/rovani-suits'` in `next.config.ts`. Without it, all internal links and asset paths break. Rather than add basePath for now, Pages was deleted (repo kept). Planned deployment: Vercel.

---

### Session 2 — 3D Configurator + Measurement System (May 22, 2026)

**Goal:** Make ROVANI a real, launchable product. User confirmed they will actually be stitching suits.

**Two features built:**

#### Feature 1: Three.js 3D Suit Configurator

**File:** `src/components/three/SuitConfigurator.tsx`  
**Changed:** `src/components/bespoke/BespokePage.tsx` (split into two-column layout)

Packages installed: `three @react-three/fiber @react-three/drei @types/three`

The 3D suit is **procedural** — no external 3D model files. All geometry built from Three.js primitives:
- Jacket body: `ExtrudeGeometry` from a `THREE.Shape` trapezoid (wider at shoulders, narrower at hem)
- Lapels: separate `ExtrudeGeometry` for notch and peak variants, mirrored for left/right
- Sleeves: `TubeGeometry` from a `CatmullRomCurve3` with slight forward taper
- Buttons: `SphereGeometry` — positioned on the button line, count = 2 or 3 from selection
- Pockets, shoulder pads, shirt collar: `BoxGeometry` planes

Fabric texture is generated at runtime via an `OffscreenCanvas`:
- drawPattern type is set per fabric: `twill` (wool), `herringbone` (Harris Tweed), `plain` (cashmere/linen)
- Canvas is 256×256, applied as a `THREE.CanvasTexture` with `repeat.set(4,4)` for tiling
- Color from the selected colour hex is applied to the MeshStandardMaterial

The bespoke builder was redesigned from a single-column to a **two-column split**:
- Left 55%: config steps + progress stepper + navigation
- Right 45%: sticky 3D preview panel (full viewport height, locked to top-20)
- Mobile: 38vh sticky preview above steps (hidden on lg+)

Dynamic import with `ssr: false` ensures Three.js doesn't run server-side.

#### Feature 2: Self-Measurement System

**New files:**
- `src/lib/data/measurements.ts` — 16 measurement definitions
- `src/lib/store/measurementStore.ts` — Zustand + persist middleware → localStorage
- `src/app/measure/page.tsx` — route
- `src/components/measure/MeasurePage.tsx` — full page
- `src/components/measure/BodyDiagram.tsx` — SVG body figure with 16 numbered hotspots
- `src/components/measure/MeasurementGuide.tsx` — expandable instruction cards

**Modified:**
- `src/components/bespoke/BespokePage.tsx` — Step 3 expanded from 6 to 16 fields + auto-fill from store
- `src/components/layout/Navbar.tsx` — added "Measure" link (Collections | Bespoke | Measure | Lookbook)
- `src/app/page.tsx` — added `<MeasureTeaser />` between TheProcess and LookbookTeaser
- `src/lib/data/fabrics.ts` — added `threeRoughness` and `threePattern` fields to `FabricOption`

The 16 measurements cover jacket (height, chest, waist, seat/hips, shoulder, back length, jacket length, sleeve, bicep, wrist, neck) and trousers (waist, seat, thigh, inseam, outseam).

Each measurement has:
- `range: [min, max]` — validates on input, shows amber warning if outside range
- `tip` — how to take the measurement correctly
- `mistake` — the most common error for that measurement
- `svgX/svgY` — percentage coordinates for the SVG hotspot on the body diagram

Measurements are saved to localStorage and auto-populate bespoke builder Step 3.

**Commit:** `feat: 3D suit configurator and self-measurement system` — 14 files, 2,548 insertions.

---

## Bugs & Fixes

### CSS not loading (Session 2)

**Symptom:** Page appeared unstyled. CSS file at `/_next/static/css/app/layout.css` returned 404.

**Root cause:** Multiple dev servers running simultaneously across two projects:
- Portfolio (`C:\projects\RiturajPortfolio`) on port 3000
- ROVANI (`C:\projects\RovaniSuits`) on port 3002 (or 3001)

When the browser was opened to `localhost:3000`, it served the Portfolio's CSS (with cyan/green `#00d4ff` colors), not ROVANI's gold/cream palette.

**Fix:** Always use `localhost:3002` for ROVANI. The `.claude/launch.json` is set to `"port": 3002`. Confirmed by checking the compiled CSS from port 3002 contains `C9A96E` (gold), `gold-text`, `section-label`, `step-active` etc.

**How to verify:** Open `localhost:3002`, not `localhost:3000`. Check `/_next/static/css/app/layout.css` from port 3002 — it's 64KB and contains ROVANI utilities.

### Dev server stale CSS (Session 2)

**Symptom:** After running `npm run build` followed by `npm run dev`, the dev server referenced `/_next/static/css/app/layout.css` but that file returned 404. The `.next/static` folder was empty (build had generated hash-named chunks, dev referenced path-named chunks).

**Root cause:** `npm run build` (with `output: "export"`) generates production CSS chunks with hash filenames. The dev server references CSS by path, not hash. The old `.next` folder from the build was confusing the dev server.

**Fix:** `Remove-Item .next -Recurse -Force` before starting dev. The dev server regenerates `.next` fresh and serves CSS correctly.

---

## Key Technical Decisions

### Why Three.js procedural geometry (not GLTF/OBJ models)?
- No 3D artist needed. All geometry derived from designer inputs.
- File size: 0KB for models vs 500KB–5MB for a realistic suit model.
- Fully reactive: adding 100ms to change the lapel geometry is trivial; swapping a GLTF model would require preloading multiple files.
- Tradeoff: less photorealistic. The abstract geometric style fits the luxury brand aesthetic (architectural, minimal).

### Why Zustand persist for measurements?
- Users measure themselves at home before coming to the atelier.
- They need measurements to survive page refreshes and browser restarts.
- No server/auth needed — localStorage is sufficient for pre-consultation data.
- Cart deliberately NOT persisted (clears on refresh — users should re-confirm before submitting).

### Why `output: "export"` instead of server-side rendering?
- The site is a presentation layer (no database, no auth in v1).
- Static export can be served from anywhere (CDN, Vercel edge, GitHub Pages).
- When we add Razorpay / NextAuth / DB later, we'll switch to `output: undefined` and deploy server-side on Vercel.

### Why separate `/measure` page and not just the builder?
- Measuring takes 15 minutes with a helper. Users do it at a different time from browsing.
- The illustrated guide with the SVG diagram needs space — it would be cramped inside a wizard step.
- Decoupled flow: measure once → save → configure any time.

---

## Environment Notes

- **Node:** v20+
- **npm run dev port:** 3002 (ROVANI), 3000 (Portfolio), 3001 (sometimes assigned by Next.js auto-port)
- **Build output:** `/out` folder (static HTML/JS/CSS) — ready for Vercel or CDN
- **No `.env` files** — no secrets in v1. Everything is public.
- **Git config:** commits under Rituraj's identity only. No Claude co-author trailer.

---

## Planned next session

1. Product detail pages — `/collections/[slug]` with size guide + add-to-cart
2. Checkout page — order summary, contact form, "we'll call you" confirmation
3. Appointment booking — simple form: name, phone, city, preferred time
4. WhatsApp CTA — floating button bottom-right, pre-filled message
