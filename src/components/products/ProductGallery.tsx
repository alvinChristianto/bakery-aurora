"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Product } from "@/data/products";
import ProductVisual from "./ProductVisual";
import { cn } from "@/lib/utils";

export type GalleryFrame = {
  label: string;
  accent: string;
  emoji: string;
};

/**
 * Deterministically produce N accent shades from a base colour.
 * Used so variant-derived frames are visually distinct.
 */
function varyHex(hex: string, step: number): string {
  // Strip # and parse
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  // Shift hue by rotating ~30° per step in HSL-ish space (simple affine shift)
  const shift = (step * 18) % 360;
  const [h, s, l] = rgbToHsl(r, g, b);
  const { r: nr, g: ng, b: nb } = hslToRgb((h + shift) % 360, s, l + (step % 3 === 0 ? 5 : -5));
  return `#${[nr, ng, nb].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

function buildFrames(product: Product): GalleryFrame[] {
  // Build a frame per variant, each tinted differently
  const { variants } = product;
  const frames: GalleryFrame[] = variants.map((v, i) => ({
    label: v.name,
    accent: varyHex(product.accent, i + 1),
    emoji: product.emoji,
  }));

  // If there's only one variant, add accent variations so we always have 2–3 frames
  if (frames.length === 1) {
    frames.push(
      { label: `Alt 1`, accent: varyHex(product.accent, 5), emoji: product.emoji },
      { label: `Alt 2`, accent: varyHex(product.accent, 10), emoji: product.emoji },
    );
  }

  return frames;
}

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const frames = buildFrames(product);
  const active = frames[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Active frame */}
      <div className="overflow-hidden rounded-2xl">
        <ProductVisual
          product={product}
          accent={active.accent}
          emoji={active.emoji}
          aspect="aspect-[4/3]"
          shimmer={false}
        />
      </div>

      {/* Thumbnails — only shown when there are multiple frames */}
      {frames.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Product views">
          {frames.map((frame, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-label={frame.label}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative aspect-[4/3] w-[5.5rem] shrink-0 overflow-hidden rounded-xl border-2 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "border-primary shadow-[0_0_20px_-6px_rgba(255,51,51,0.45)]"
                    : "border-transparent opacity-60 hover:opacity-90",
                )}
              >
                <ProductVisual
                  product={product}
                  accent={frame.accent}
                  emoji={frame.emoji}
                  aspect="aspect-[4/3]"
                  shimmer={false}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
