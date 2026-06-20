import type { Metadata } from "next";
import CatalogFilter from "@/components/products/CatalogFilter";
import Reveal from "@/components/ui/Reveal";
import { products, categories } from "@/data/products";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description:
    "Browse the full Aurora Bakehouse menu — sourdough breads, laminated pastries, celebration cakes, and limited signature bakes. Filter by category.",
  path: "/products",
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${siteConfig.name} Menu`,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      category: p.categorySlug,
      url: `${siteConfig.url}/products/${p.slug}`,
      offers: {
        "@type": "Offer",
        price: p.basePrice.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const valid = categories.some((c) => c.slug === category);
  const initialCategory = valid ? category : "all";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="relative px-6 pb-8 pt-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-tint px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The menu
            </span>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold text-ink sm:text-6xl">
              Everything we <span className="text-gradient">bake</span>, fresh today
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              {products.length} small-batch creations across {categories.length} categories.
              Hover a card to see it tilt; tap a category to filter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <CatalogFilter initialCategory={initialCategory} />
      </section>
    </>
  );
}
