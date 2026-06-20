# Plan: SEO Optimization (`plan-seo-optimization`)

## Context

Aurora Bakehouse has a solid SEO foundation — `siteConfig`, `buildMetadata()`, and `bakeryJsonLd()` are already wired up, sitemaps and robots are in place, and all three routes have metadata. However, a full audit revealed several correctness bugs (broken schema references, a homepage with no metadata export, a sitemap that cache-busts on every build) and missed rich-result opportunities (BreadcrumbList, FAQ, Person, HowTo schemas). This plan fixes the correctness issues first, then layers in schema enhancements that unlock Google rich results.

---

## Prioritized Steps

### Priority 1 — Correctness / High Impact

**Step 1 — Fix ItemList `url` per item** (`src/app/products/page.tsx`)

In the `itemListJsonLd` object, each `item` block is missing a `url` field. Without it Google cannot link list entries to indexable pages. Add to each item:
```ts
url: `${siteConfig.url}/products/${p.slug}`,
```
`siteConfig` is already imported.

---

**Step 2 — Enhance Product schema + extract helper** (`src/lib/seo.ts`, `src/app/products/[slug]/page.tsx`)

The inline Product schema on the slug page is missing `brand`, `url`, `sku`, `image`, and `offers.seller`. Add a new exported helper in `seo.ts`:

```ts
export function productJsonLd({ name, description, categorySlug, slug, id, lowPrice, highPrice }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name, description, sku: id, category: categorySlug,
    url: `${siteConfig.url}/products/${slug}`,
    image: `${siteConfig.url}/opengraph-image`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "AggregateOffer",
      lowPrice, highPrice, priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}
```

In `[slug]/page.tsx`, remove the inline object literal and call `productJsonLd(...)` instead. Import it from `@/lib/seo`.

---

**Step 3 — Add BreadcrumbList schema to product detail pages** (`src/lib/seo.ts`, `src/app/products/[slug]/page.tsx`)

The breadcrumb UI already exists; add schema.org markup so Google shows breadcrumb trails in SERPs. Add helper to `seo.ts`:

```ts
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem", position: i + 1, name: item.name, item: item.url,
    })),
  };
}
```

In `[slug]/page.tsx`, build and inject a second `<script type="application/ld+json">` after the Product one:
```ts
const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Menu", url: `${siteConfig.url}/products` },
  { name: product.name, url: `${siteConfig.url}/products/${product.slug}` },
]);
```

---

**Step 4 — Add explicit `metadata` export to homepage** (`src/app/page.tsx`)

The homepage currently has no `metadata` export — it falls back to layout defaults. Add:

```ts
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Artisan Sourdough, Pastries & Cakes — Future-Baked Daily",
  description:
    "Aurora Bakehouse crafts wild-fermented sourdough, 27-layer croissants, and signature celebration cakes from scratch every morning. Order online for same-day pickup.",
  path: "/",
});
```

---

**Step 5 — Fix sitemap `lastModified`** (`src/app/sitemap.ts`)

`new Date()` causes cache-busting on every build. Replace with a fixed constant (env-variable friendly):

```ts
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE
  ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
  : new Date("2026-06-20");
```

Replace all uses of `now` with `BUILD_DATE`.

---

**Step 6 — Add Disallow rules to robots.ts** (`src/app/robots.ts`)

Query param variants of `/products` (e.g. `?category=`, `?sort=`) can be crawled as duplicate content. Add:

```ts
rules: [{
  userAgent: "*",
  allow: "/",
  disallow: ["/*?category=*", "/*?sort=*", "/*?page=*"],
}],
```

---

### Priority 2 — Rich Snippet Opportunities

**Step 7 — Person schema for team members** (`src/lib/seo.ts`, `src/app/about/page.tsx`)

The `team` array in `about/page.tsx` has names + roles. Add helper to `seo.ts`:

```ts
export function teamPersonsJsonLd(members: { name: string; jobTitle: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: members.map((m, i) => ({
      "@type": "ListItem", position: i + 1,
      item: {
        "@type": "Person", name: m.name, jobTitle: m.jobTitle,
        worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      },
    })),
  };
}
```

Inject as a `<script type="application/ld+json">` in the `about/page.tsx` server component, mapping the existing `team` array: `team.map(m => ({ name: m.name, jobTitle: m.role }))`.

> Note: the local variable named `process` in `about/page.tsx` (line ~22) shadows Node's global — this is a pre-existing issue; the new `process.map(...)` call in Step 8 correctly refers to that local array.

---

**Step 8 — HowTo schema for baking process** (`src/lib/seo.ts`, `src/app/about/page.tsx`)

The four-step process section maps perfectly to `HowTo` schema. Add helper to `seo.ts`:

```ts
export function howToJsonLd(args: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name, description: args.description,
    step: args.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}
```

Call it in `about/page.tsx` using the local `process` array: `howToJsonLd({ name: "How Aurora Bakehouse Bakes Every Day", description: "...", steps: process.map(p => ({ name: p.title, text: p.body })) })`.

---

**Step 9 — FAQ schema + visible FAQ section on homepage** (`src/lib/seo.ts`, `src/app/page.tsx`)

Add helper to `seo.ts`:

```ts
export function faqJsonLd(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: entries.map(e => ({
      "@type": "Question", name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}
```

In `page.tsx`, define 4 FAQ entries (opening hours, online ordering, dietary options, location) and render them as a native `<details>/<summary>` accordion — no JS, no animation, inherently reduced-motion safe. Place the section between `AboutTeaser` and `CtaSection`.

---

### Priority 3 — PWA / Polish

**Step 10 — PWA manifest icon sizes** (`src/app/manifest.ts`, `public/`)

Generate `icon-192.png` and `icon-512.png` from `icon.svg` and place in `public/`. Then update `manifest.ts`:

```ts
icons: [
  { src: "/icon.svg",     sizes: "any",     type: "image/svg+xml", purpose: "any" },
  { src: "/icon-192.png", sizes: "192x192", type: "image/png",     purpose: "any maskable" },
  { src: "/icon-512.png", sizes: "512x512", type: "image/png",     purpose: "any maskable" },
],
categories: ["food", "shopping"],
shortcuts: [{ name: "View Menu", short_name: "Menu", url: "/products", icons: [{ src: "/icon-192.png", sizes: "192x192" }] }],
```

Also add `scope: "/"` and `orientation: "portrait"`.

---

**Step 11 — Apple touch icon** (`src/app/layout.tsx`, `public/`)

Generate `apple-touch-icon.png` (180×180) and place in `public/`. Add to the `metadata` export in `layout.tsx`:

```ts
icons: {
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
},
```

---

**Step 12 — favicon.ico** — already at `src/app/favicon.ico`; Next.js App Router serves it automatically. No change needed.

---

**Step 13 — Fix social links in siteConfig** (`src/lib/seo.ts`)

Placeholder links (`instagram.com`, `twitter.com` with no handles) produce incorrect `sameAs` data. Update to proper handles:
```ts
links: {
  instagram: "https://instagram.com/aurorabakehouse",
  twitter: "https://x.com/aurorabakehouse",
},
```

---

**Step 14 — Per-product OG images** (`src/app/products/[slug]/opengraph-image.tsx`)

Create a new route-segment OG image handler that renders a 1200×630 `ImageResponse` using the product's `emoji`, `accent`, `name`, `description`, and `basePrice`. Next.js automatically picks this up for all 12 product detail pages; no change to `page.tsx` or `generateMetadata` is needed.

---

## Files Summary

| File | Action |
|------|--------|
| `src/lib/seo.ts` | Add: `productJsonLd`, `breadcrumbJsonLd`, `teamPersonsJsonLd`, `howToJsonLd`, `faqJsonLd`; fix `sameAs` filter; update social links |
| `src/app/products/page.tsx` | Add `url` to each ItemList item |
| `src/app/products/[slug]/page.tsx` | Use new `productJsonLd` helper; add BreadcrumbList `<script>` |
| `src/app/about/page.tsx` | Add Person + HowTo `<script>` tags |
| `src/app/page.tsx` | Add `metadata` export; add FAQ schema + `<details>` section |
| `src/app/sitemap.ts` | Replace `new Date()` with fixed `BUILD_DATE` constant |
| `src/app/robots.ts` | Add Disallow rules for query param URLs |
| `src/app/manifest.ts` | Add PNG icon sizes, categories, shortcuts, scope, orientation |
| `src/app/layout.tsx` | Add `icons.apple` to metadata export |
| `src/app/products/[slug]/opengraph-image.tsx` | New file — per-product OG image using `ImageResponse` |
| `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png` | New raster assets (generated via Node.js script) |

---

## Reuse Notes

- All schema helpers extend the existing pattern in `src/lib/seo.ts` (pure functions, `siteConfig` for URLs/names, return plain object for `JSON.stringify`)
- `buildMetadata()` from `src/lib/seo.ts` is reused for the homepage `metadata` export (Step 4)
- `getProductBySlug()` from `src/data/products.ts` is reused in the OG image handler (Step 14)
- All JSON-LD injected as `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` — consistent with existing patterns

---

## Verification

1. **Steps 1–3:** On `/products`, inspect `script[type="application/ld+json"]` — each `item` has a `url`. On `/products/aurora-sourdough`, confirm 3 JSON-LD blocks: Bakery (from layout), Product (with `brand`, `sku`, `url`), BreadcrumbList (3 items).
2. **Step 4:** `<title>` on homepage source reads `Artisan Sourdough, Pastries & Cakes — Future-Baked Daily`.
3. **Step 5:** Fetch `/sitemap.xml` — all `<lastmod>` entries show the same fixed date.
4. **Step 6:** Fetch `/robots.txt` — three `Disallow` lines for query params appear.
5. **Steps 7–8:** On `/about`, `querySelectorAll('script[type="application/ld+json"]')` returns 3 nodes; last two are ItemList (Persons) and HowTo (4 steps).
6. **Step 9:** On homepage, `querySelectorAll('details')` returns 4 elements. JSON-LD block has `@type: "FAQPage"`.
7. **Steps 10–11:** Chrome DevTools → Application → Manifest shows 3 icons. iOS "Add to Home Screen" uses the 180×180 icon.
8. **Step 14:** Fetch `/products/aurora-sourdough/opengraph-image` — renders a 1200×630 PNG with product name and emoji.
9. **Build check:** `npm run build` must pass green. `npm run lint` must be clean.
