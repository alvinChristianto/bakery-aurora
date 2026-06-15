import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, getCategory } from "@/data/products";
import TiltCard from "@/components/ui/TiltCard";
import VariantPills from "./VariantPills";
import { cn } from "@/lib/utils";

/**
 * Product card with a 3D pointer-tilt and a gradient "photo" placeholder.
 * Swap `ProductVisual` for a next/image once real photography is available.
 */
export default function ProductCard({ product, href }: { product: Product; href?: string }) {
  const category = getCategory(product.categorySlug);

  const inner = (
    <article className="group/card preserve-3d relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.25)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(255,51,51,0.45)]">
      <ProductVisual product={product} />

      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {category && (
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
                {category.name}
              </span>
            )}
            <h3 className="mt-1 text-lg font-bold text-ink">{product.name}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-white">
            {formatPrice(product.basePrice)}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted line-clamp-2">{product.description}</p>

        <div className="mt-auto pt-2">
          <VariantPills variants={product.variants} />
        </div>
      </div>
    </article>
  );

  return (
    <TiltCard className="h-full">
      {href ? (
        <Link href={href} aria-label={`View ${product.name}`} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </TiltCard>
  );
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <div
      className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem]"
      style={{
        background: `radial-gradient(120% 120% at 28% 20%, ${product.accent} 0%, ${product.accent}cc 38%, #1a1014 100%)`,
      }}
    >
      {/* tags */}
      {product.tags.length > 0 && (
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/30 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* depth-floated emoji stand-in for product photography */}
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center text-[5.5rem] drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover/card:scale-110"
        style={{ transform: "translateZ(48px)" }}
      >
        {product.emoji}
      </span>

      {/* gloss + shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
      <div
        className={cn(
          "absolute inset-0 -translate-x-full opacity-0 transition-all duration-700",
          "group-hover/card:translate-x-full group-hover/card:opacity-100",
          "bg-gradient-to-r from-transparent via-white/25 to-transparent",
        )}
      />
    </div>
  );
}
