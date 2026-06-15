# 🥐 Aurora Bakehouse

A futuristic bakery website built with Next.js 16 — sourdough breads, laminated pastries,
and signature cakes. White-dominant design with a `#FF3333` accent, tasteful CSS 3D,
smooth scrolling, scroll-reveal motion, and production-grade SEO.

![Aurora Bakehouse](public/icon.svg)

## Features

- **Three routes** — Home, Products (catalog with category + variant filtering), About
- **CSS 3D & motion** — pointer-tilt product cards, parallax hero, magnetic buttons,
  scroll-reveal sections, route transitions, smooth (Lenis) scrolling
- **Accessible** — every animation respects `prefers-reduced-motion`
- **SEO built-in** — per-route metadata, `sitemap.xml`, `robots.txt`, web manifest,
  dynamic OpenGraph image, and JSON-LD (Bakery + Product/ItemList)
- **No backend** — products live in a single typed data file, easy to edit

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS v4 |
| Animation | motion (Framer Motion) + lenis |
| Fonts | Inter + Space Grotesk (`next/font`) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the build
npm run lint    # lint
```

## Configuration

Set the production URL so SEO metadata resolves correctly:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Brand details (name, contact, socials) live in `src/lib/seo.ts`; the catalog lives in
`src/data/products.ts`. See `AGENTS.md` for project conventions and how to add products.

## Deploy

Deploy on [Vercel](https://vercel.com) with zero configuration — import the repo, set
`NEXT_PUBLIC_SITE_URL`, and ship. Make sure `npm run build` passes first.

---

Product imagery uses on-brand gradient placeholders out of the box; swap in real photos via
`next/image` (see `AGENTS.md`).
