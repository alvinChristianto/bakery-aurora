"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Hero slides. To use real photography, add an `image` field and render it with
// next/image inside <Slide /> (see AGENTS.md).
const slides = [
  { name: "Aurora Sourdough", tag: "Breads", emoji: "🍞", from: "#e7ab5e", to: "#7a4a2b" },
  { name: "Halo Croissant", tag: "Pastries", emoji: "🥐", from: "#f1c66b", to: "#c87a3a" },
  { name: "Velvet Eclipse Cake", tag: "Cakes", emoji: "🎂", from: "#ff5e8a", to: "#c4122f" },
  { name: "Neon Cruffin", tag: "Signature", emoji: "✨", from: "#ff6a6a", to: "#b30f0f" },
];

const AUTOPLAY_MS = 2000;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

/** Full-bleed background carousel. Overlaid hero content is passed as `children`. */
export default function HeroGallery({ children }: { children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  }, [index]);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  // autoplay every 2s, paused on hover/focus and when reduced motion is preferred
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const active = slides[index];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured bakes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      {/* slides */}
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: reduce ? 0 : 0.5 },
          }}
          className="absolute inset-0"
        >
          <Slide slide={active} />
        </motion.div>
      </AnimatePresence>

      {/* scrims for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />

      {/* overlaid hero content */}
      <div className="relative z-10">{children}</div>

      {/* current slide label */}
      <div className="pointer-events-none absolute bottom-9 left-6 z-20 hidden sm:block">
        <p aria-live="polite" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {active.tag}
        </p>
        <p className="text-lg font-bold text-white">{active.name}</p>
      </div>

      {/* control bar: prev · dots · next */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="glass-dark grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-primary"
        >
          <Chevron dir="left" />
        </button>

        <div className="flex items-center gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${slide.name}`}
              aria-current={i === index}
              className={
                i === index
                  ? "h-2.5 w-7 rounded-full bg-primary transition-all"
                  : "h-2.5 w-2.5 rounded-full bg-white/40 transition-all hover:bg-white/70"
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="glass-dark grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-primary"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}

function Slide({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <div
      className="grain absolute inset-0 grid place-items-center"
      style={{ background: `radial-gradient(120% 120% at 66% 28%, ${slide.from}, ${slide.to})` }}
    >
      <span className="select-none text-[12rem] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:text-[16rem] lg:text-[20rem]">
        {slide.emoji}
      </span>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
