# Plan: Product Detail Pages (`/products/[slug]`)

## Context

The Aurora Bakehouse brand promises "order online for pickup" everywhere — nav,
hero CTAs, SEO metadata — but the site is a 3-route static brochure with **no per-product
pages**. Products already carry everything a detail page needs (`slug`, `description`,
`variants`, `tags`, `accent`, `emoji`), yet every card links only to the `/products`
listing. The `slug` field is defined but unused for routing.

This change adds individual product pages — the single highest value-per-effort gap and
the foundation for any future ordering flow. It stays **fully static (SSG)**: no backend,
DB, payments, or env secrets. Each product becomes a real, crawlable URL with its own
metadata and `Product` JSON-LD, deepening SEO and giving every featured/category link a
real destination.

## Goals

- A statically generated page at `/products/<slug>` for all 12 products.
- Rich content: a **product gallery** (multi-frame visual with thumbnails), full
  description, all variants, tags, category, price, and a "related products" cross-sell
  from the same category.
- Per-product `metadata` (title/description/canonical/OG) + `Product` JSON-LD.
- Wire existing product cards to link to detail pages instead of the listing.
- Graceful 404 for unknown slugs; product URLs added to the sitemap.

## Non-goals

- No cart, add-to-cart, quantity selectors, or checkout (variants stay display-only).
- No real photography — the gallery is built from gradient + emoji placeholder frames
  (consistent with the site). It is image-ready: drop in real `image` fields later
  without restructuring the gallery.
- No backend / API routes / database.

---

## Implementation

### 1. Data helpers — `src/data/products.ts`

Add two pure helpers alongside the existing ones (`getCategory`, `getProductsByCategory`):

- `getProductBySlug(slug: string): Product | undefined`
- `getRelatedProducts(product: Product, limit = 3): Product[]` — same `categorySlug`,
  excludes the current product, falls back to other products if the category is thin so
  the rail is never empty.

Reuse `getProductsByCategory` / `formatPrice` rather than duplicating logic.

### 2. Dynamic route — `src/app/products/[slug]/page.tsx` (new)

Server component, follows the Next.js 16 async-params convention already used in
`products/page.tsx` (verified against `node_modules/next/dist/docs/.../dynamic-routes.md`
and `generate-static-params.md`):

- **`generateStaticParams()`** → `products.map(p => ({ slug: p.slug }))` (prerenders all
  12 at build). Cache Components is **not** enabled (`next.config.ts` is empty), so the
  plain full-list pattern applies — no Suspense/placeholder needed.
- **`export const dynamicParams = false`** → unknown slugs 404 instead of
  rendering at runtime (keeps it purely static).
- **`generateMetadata({ params })`**: `await params`, look up product; if missing call
  `notFound()`. Build tags via the existing `buildMetadata({ title, description, path })`
  from `lib/seo.ts` with `path: \`/products/${slug}\`` so canonical/OG are correct. Add
  `openGraph.type: "article"` override is optional — default "website" is fine.
- **Page body** (`params: Promise<{ slug: string }>`): `await params`, look up product,
  `notFound()` if absent. Render:
  - Breadcrumb: Home / Menu / {name} (links to `/` and `/products`).
  - Two-column hero: **product gallery** (left, see step 3) + info (right):
    category eyebrow (links to `/products?category=<slug>`), `<h1>` name, price via
    `formatPrice`, full description, tag chips, full variant list with per-variant
    prices, and the existing CTAs ("Order Online" `tel:` + "Back to menu").
  - **Related products** section using `getRelatedProducts` + existing `ProductCard`
    (now linking to detail pages — see step 4).
  - **`Product` JSON-LD** `<script>` (name, description, category, `offers` with
    `lowPrice`/`highPrice` from variants or `AggregateOffer`, `availability: InStock`),
    mirroring the shape already in `products/page.tsx`.
- Reuse existing UI primitives: `Reveal`, `SectionHeading`, `TiltCard`/`ProductCard`,
  and the same Tailwind tokens (`text-gradient`, `bg-primary`, `border-line`, etc.).

### 3. Product gallery + shared visual — `src/components/products/`

**3a. Extract `ProductVisual` (small refactor).** It currently lives privately inside
`ProductCard.tsx`. Export it from a small new file
`src/components/products/ProductVisual.tsx` (accepting an optional size/aspect prop and an
optional per-frame override of `emoji`/`accent`), and have `ProductCard` import it. Keeps
one source of truth for the gradient+emoji+tags placeholder look used by both the card and
the gallery frames.

**3b. New `ProductGallery` component** — `src/components/products/ProductGallery.tsx`
(`"use client"`, since it tracks the active frame):
- Renders a large active frame (a `ProductVisual` at hero size) plus a row of clickable
  **thumbnails** below/beside it. Clicking a thumbnail switches the active frame; the
  active thumb gets a `border-primary` ring and `aria-current`.
- **Frames are derived from the product** (image-ready, no image files yet): build a frame
  per `variant` — each frame reuses the product `emoji` but tints with a deterministic
  hue shift of `product.accent` so variants read as visually distinct. If a product has
  only one variant, fall back to a small fixed set of accent shades so the gallery still
  has 2–3 frames. Single-frame products simply render the active frame with no thumb row.
- **Future real photos:** when products gain an `image`/`images` field, each frame maps to
  a `next/image` instead of the gradient — the component's frame array is the only thing
  that changes. Note this in a comment, mirroring the existing
  ProductCard/HeroGallery guidance in CLAUDE.md.
- **Reduced motion:** any crossfade/transition between frames must check
  `useReducedMotion()` (mandatory per AGENTS.md); fall back to an instant swap.
- Keyboard accessible: thumbnails are real `<button>`s; arrow-key navigation optional.

### 4. Link cards to detail pages

Make cards point at the new route instead of `/products`:
- `src/components/home/FeaturedProducts.tsx`: change `href="/products"` →
  `href={\`/products/${product.slug}\`}`.
- `src/components/products/CatalogFilter.tsx`: pass
  `href={\`/products/${product.slug}\`}` to `<ProductCard>` (currently no `href`, so
  catalog cards aren't links at all).
- `ProductCard` already supports an optional `href` — no change to its API needed.

### 5. SEO follow-through — `src/app/sitemap.ts`

Map `products` into the sitemap so every detail URL is listed:
`...products.map(p => ({ url: \`${siteConfig.url}/products/${p.slug}\`, ... priority: 0.6 }))`.
Reuse the existing `siteConfig.url`.

### 6. Not-found (optional, nice-to-have)

Add `src/app/products/[slug]/not-found.tsx` with on-brand copy + "Back to menu" link.
With `dynamicParams = false` the framework default 404 also works; include this only if
we want the styled version.

---

## Files

- **New:** `src/app/products/[slug]/page.tsx`
- **New:** `src/components/products/ProductVisual.tsx` (extracted from `ProductCard`)
- **New:** `src/components/products/ProductGallery.tsx` (client; active frame + thumbnails)
- **New (optional):** `src/app/products/[slug]/not-found.tsx`
- **Edit:** `src/data/products.ts` (two helpers)
- **Edit:** `src/components/products/ProductCard.tsx` (import shared `ProductVisual`)
- **Edit:** `src/components/home/FeaturedProducts.tsx` (slug href)
- **Edit:** `src/components/products/CatalogFilter.tsx` (slug href)
- **Edit:** `src/app/sitemap.ts` (per-product URLs)

## Verification

1. `npm run dev` → visit `/products/aurora-sourdough` and a few others; confirm content,
   variants, related rail, breadcrumb, and CTAs render. Click gallery thumbnails → active
   frame switches and the active thumb is highlighted; single-variant products still show
   a sensible 2–3 frame gallery (or a clean single frame).
2. Click cards from the homepage (Featured) and `/products` grid → land on the right
   detail page. Category eyebrow link returns to a filtered `/products?category=...`.
3. Visit a bad slug (`/products/does-not-exist`) → 404 (styled if `not-found.tsx` added).
4. View source on a detail page → `<title>`, canonical, OG tags, and `Product` JSON-LD
   present and correct.
5. `npm run build` must be green — confirm the build log prints 12 prerendered
   `/products/[slug]` routes (SSG). `npm run lint` clean.
6. Spot-check reduced-motion (existing primitives already honor `useReducedMotion`).
