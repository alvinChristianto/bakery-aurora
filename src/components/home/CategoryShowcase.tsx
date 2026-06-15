import Link from "next/link";
import { categories, getProductsByCategory } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function CategoryShowcase() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Explore"
          title={
            <>
              Four ways to <span className="text-gradient">indulge</span>
            </>
          }
          description="From everyday loaves to limited lab experiments — find your category."
          className="mx-auto items-center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const count = getProductsByCategory(category.slug).length;
            return (
              <Reveal key={category.slug} delay={i * 0.08}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_30px_60px_-30px_rgba(255,51,51,0.45)]"
                >
                  <div
                    className="grid h-16 w-16 place-items-center rounded-2xl text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: `${category.accent}22` }}
                  >
                    {category.emoji}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {count} item{count === 1 ? "" : "s"}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-tint text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
