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

export default function HeroGallery() {
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
      className="relative"
    >
      <div className="glow-red relative h-[58vh] min-h-[400px] overflow-hidden rounded-[2rem] bg-ink sm:h-[66vh] lg:h-[82vh]">
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: reduce ? 0 : 0.4 },
            }}
            className="absolute inset-0"
          >
            <Slide slide={active} />
          </motion.div>
        </AnimatePresence>

        {/* counter */}
        <div
          aria-live="polite"
          className="glass-dark absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white"
        >
          {index + 1} / {slides.length}
        </div>

        {/* prev / next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="glass-dark absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-primary"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="glass-dark absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-primary"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {/* dots */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
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
                : "h-2.5 w-2.5 rounded-full bg-ink/20 transition-all hover:bg-ink/45"
            }
          />
        ))}
      </div>
    </div>
  );
}

function Slide({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <div
      className="grain relative grid h-full place-items-center"
      style={{ background: `radial-gradient(125% 125% at 30% 18%, ${slide.from}, ${slide.to})` }}
    >
      <span className="text-[8rem] drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] sm:text-[11rem] lg:text-[14rem]">
        {slide.emoji}
      </span>
      <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
          {slide.tag}
        </p>
        <p className="text-lg font-bold text-ink">{slide.name}</p>
      </div>
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
