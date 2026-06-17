import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export type ProductVisualProps = {
  product: Pick<Product, "accent" | "emoji" | "tags">;
  /** Override the accent colour for this frame (used by ProductGallery). */
  accent?: string;
  /** Override the emoji for this frame. */
  emoji?: string;
  /** Aspect ratio class (default "aspect-[5/4]"). */
  aspect?: string;
  /** Whether to show the hover shimmer (default true in a card context). */
  shimmer?: boolean;
};

/**
 * Gradient + emoji placeholder for product visuals. Shared by ProductCard and
 * ProductGallery. Swap the emoji <span> for a next/image <Image fill … /> once
 * real photography is available (see CLAUDE.md).
 */
export default function ProductVisual({
  product,
  accent,
  emoji,
  aspect = "aspect-[5/4]",
  shimmer = true,
}: ProductVisualProps) {
  const frameAccent = accent ?? product.accent;
  const frameEmoji = emoji ?? product.emoji;

  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.25rem]", aspect)}
      style={{
        background: `radial-gradient(120% 120% at 28% 20%, ${frameAccent} 0%, ${frameAccent}cc 38%, #1a1014 100%)`,
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
        {frameEmoji}
      </span>

      {/* gloss + shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
      {shimmer && (
        <div
          className={cn(
            "absolute inset-0 -translate-x-full opacity-0 transition-all duration-700",
            "group-hover/card:translate-x-full group-hover/card:opacity-100",
            "bg-gradient-to-r from-transparent via-white/25 to-transparent",
          )}
        />
      )}
    </div>
  );
}
