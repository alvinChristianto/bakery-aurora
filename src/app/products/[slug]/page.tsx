import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { products, getProductBySlug, getRelatedProducts, getCategory, formatPrice } from "@/data/products";
import { buildMetadata, siteConfig, productJsonLd as buildProductJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import ProductGallery from "@/components/products/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";
import VariantPills from "@/components/products/VariantPills";

export const dynamicParams = false;

/**
 * Prerender all 12 products at build time (SSG).
 */
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Per-product metadata with canonical URL and OG tags.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product, 3);
  const allPrices = product.variants.map((v) => v.price);
  const lowPrice = Math.min(...allPrices);
  const highPrice = Math.max(...allPrices);

  const productLd = buildProductJsonLd({
    name: product.name,
    description: product.description,
    categorySlug: product.categorySlug,
    slug: product.slug,
    id: product.id,
    lowPrice: lowPrice.toFixed(2),
    highPrice: highPrice.toFixed(2),
  });

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Menu", url: `${siteConfig.url}/products` },
    { name: product.name, url: `${siteConfig.url}/products/${product.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <section className="relative px-6 pt-36">
        <nav className="mx-auto max-w-6xl" aria-label="Breadcrumb">
          <Reveal y={12} delay={0}>
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line">/</li>
              <li>
                <Link href="/products" className="transition-colors hover:text-primary">
                  Menu
                </Link>
              </li>
              <li aria-hidden className="text-line">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                {product.name}
              </li>
            </ol>
          </Reveal>
        </nav>
      </section>

      {/* Product hero — two-column */}
      <section className="px-6 pb-8 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left — gallery */}
            <Reveal delay={0.1}>
              <ProductGallery product={product} />
            </Reveal>

            {/* Right — product info */}
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-6">
                {/* Category eyebrow */}
                {category && (
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary-tint px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {category.name}
                  </Link>
                )}

                {/* Name */}
                <h1 className="text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
                  {product.name}
                </h1>

                {/* Price range */}
                <p className="text-2xl font-bold text-primary">
                  {lowPrice === highPrice
                    ? formatPrice(lowPrice)
                    : `${formatPrice(lowPrice)} – ${formatPrice(highPrice)}`}
                </p>

                {/* Description */}
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {product.description}
                </p>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-mist px-3 py-1 text-xs font-semibold text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Variants */}
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                    Available options
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {product.variants.map((v) => (
                      <li
                        key={v.name}
                        className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3 transition-colors hover:border-primary/30"
                      >
                        <span className="font-medium text-ink">{v.name}</span>
                        <span className="font-bold text-primary">
                          {formatPrice(v.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-dark active:scale-[0.97]"
                  >
                    Order online
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    Back to menu
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
          <SectionHeading
            eyebrow="More to love"
            title={
              <>
                You might also enjoy
              </>
            }
            description="From the same bakeshop — try something new."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <ProductCard product={p} href={`/products/${p.slug}`} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
