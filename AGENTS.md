<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aurora Bakehouse

Marketing site for a futuristic craft bakery. Three routes (Home, Products, About) with a
white-dominant, red-accent (`#FF3333`) aesthetic, tasteful CSS 3D, smooth scroll,
scroll-reveal animations, and strong SEO. Design is original, inspired by current
futuristic UI trends (sculptural 3D, glassmorphism, micro-animations).

## Stack

- **Next.js 16** (App Router, TypeScript, `src/`) + **React 19** + **Turbopack**
- **Tailwind CSS v4** (CSS-first config in `globals.css` via `@theme`)
- **motion** (Framer Motion) — transitions, scroll-reveal, 3D tilt springs
- **lenis** — inertial smooth scrolling
- **next/font** — Inter (body) + Space Grotesk (display)

## Commands

```bash
npm run dev      # dev server (Turbopack) at http://localhost:3000
npm run build    # production build (must pass before shipping)
npm start        # serve the production build
npm run lint     # eslint
```

## Structure

```
src/
  app/
    layout.tsx              # fonts, global metadata, JSON-LD (Bakery), providers
    template.tsx            # per-route enter transition
    page.tsx                # homepage (composes home/* sections)
    products/page.tsx       # catalog (server) + Product/ItemList JSON-LD
    about/page.tsx          # story, values, process, team
    globals.css             # Tailwind v4 + @theme tokens + effect utilities
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg   # SEO/PWA
  components/
    layout/   Navbar, Footer
    home/     Hero, HeroGallery (autoplay carousel), ProcessStrip, FeaturedProducts,
              CategoryShowcase, AboutTeaser, CtaSection
    products/ ProductCard (3D tilt), CatalogFilter (client island), VariantPills
    ui/       SmoothScroll, Reveal, MagneticButton, TiltCard, GradientMesh, SectionHeading
  data/products.ts          # categories + products + helpers (single source of truth)
  lib/seo.ts                # siteConfig, buildMetadata(), bakeryJsonLd()
  lib/utils.ts              # cn() class merger
```

## Design system (tokens in `src/app/globals.css`)

- **Colors:** `primary` `#FF3333` (+ `-soft/-bright/-dark/-tint`), `ink` `#0A0A0B`,
  `surface` white, `cream`, `mist`, `line`, `muted`. Use as Tailwind utilities, e.g.
  `bg-primary`, `text-ink`, `border-line`, `bg-primary-tint`.
- **Fonts:** `font-sans` (Inter) default; `font-display` (Space Grotesk) auto-applied to
  `h1–h4`.
- **Effect utilities:** `.glass`, `.glass-dark`, `.text-gradient`, `.glow-red`, `.glow-text`,
  `.mesh-bg` (dark aurora bg), `.grain`, `.shimmer`, `.preserve-3d`.
- **Animations:** `animate-float`, `animate-marquee`, `animate-spin-slow`, `animate-shimmer`.

## Conventions

- **Reduced motion is mandatory.** Every animated component checks `useReducedMotion()`
  (motion) and there is a global `prefers-reduced-motion` reset in `globals.css`. Preserve
  this when adding motion.
- **Server components by default.** Add `"use client"` only when a component needs hooks,
  state, or pointer/scroll handlers (e.g. `TiltCard`, `CatalogFilter`, `Navbar`).
- **SEO:** give each route `metadata` via `buildMetadata({ title, description, path })` from
  `lib/seo.ts`. The OG image is generated once in `app/opengraph-image.tsx` and inherited.
- **Data is static** — `data/products.ts` is the single source of truth.

## How to add a product

Append to `products` in `src/data/products.ts`:

```ts
{
  id: "p13",
  slug: "unique-slug",          // kebab-case, unique
  name: "Product Name",
  description: "One or two sentences.",
  categorySlug: "breads",        // must match an existing category slug
  basePrice: 9,                  // number; formatPrice() adds the $
  emoji: "🥯",                   // placeholder visual
  accent: "#d98a3d",             // hex; drives the gradient "photo"
  tags: ["New"],
  variants: [{ name: "Plain", price: 9 }, { name: "Seeded", price: 10 }],
  featured: true,                // optional: surfaces on the homepage
}
```

Add a category by appending to `categories` (`slug`, `name`, `description`, `emoji`,
`accent`). The Products filter, homepage showcase, and footer pick it up automatically.

## Swapping placeholder visuals for real photos

Visuals are gradient + emoji placeholders (no image files needed). For real photography:

1. Add images to `public/images/` and an `image` field to the product type.
2. In `components/products/ProductCard.tsx` (`ProductVisual`) replace the emoji `<span>`
   with `next/image`’s `<Image fill ... />`.
3. The hero carousel slides live in `components/home/HeroGallery.tsx` (`slides` array +
   `<Slide />`); swap the gradient/emoji for real images there too.
4. For remote images, add the host to `images.remotePatterns` in `next.config.ts`.

## Production notes

- Set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical URLs, sitemap, robots, JSON-LD).
- Update `siteConfig.contact` / `links` in `lib/seo.ts` with real details.
- Deploy on Vercel (zero-config). `npm run build` must be green first.
