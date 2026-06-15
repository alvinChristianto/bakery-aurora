import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Fresh picks"
          title={
            <>
              Today’s <span className="text-gradient">signature</span> bakes
            </>
          }
          description="Pulled from the oven this morning. Hover a card to feel the layers."
        />
        <Reveal delay={0.1}>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            View full menu
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.07}>
            <ProductCard product={product} href="/products" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
