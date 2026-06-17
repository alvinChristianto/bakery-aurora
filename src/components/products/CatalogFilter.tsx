"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, products } from "@/data/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const ALL = "all";

export default function CatalogFilter({ initialCategory = ALL }: { initialCategory?: string }) {
  const [active, setActive] = useState(initialCategory);

  const filtered =
    active === ALL ? products : products.filter((p) => p.categorySlug === active);

  const chips = [{ slug: ALL, name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  return (
    <div>
      {/* category chips */}
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const isActive = active === chip.slug;
          return (
            <button
              key={chip.slug}
              type="button"
              onClick={() => setActive(chip.slug)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                isActive ? "text-white" : "border border-line text-ink hover:border-primary/40",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="chip-active"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {chip.name}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "item" : "items"}
      </p>

      {/* grid */}
      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} href={`/products/${product.slug}`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
