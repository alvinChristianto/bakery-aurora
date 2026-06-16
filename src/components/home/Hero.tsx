"use client";

import { motion, useReducedMotion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientMesh from "@/components/ui/GradientMesh";
import HeroGallery from "./HeroGallery";

const headline = ["Crafted", "by", "hand.", "Baked", "for", "the"];

const stats = [
  { value: "36h", label: "Cold ferment" },
  { value: "27", label: "Butter layers" },
  { value: "100%", label: "Small batch" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const word = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="mesh-grey grain relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <GradientMesh className="opacity-40" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Future-baked daily
          </motion.span>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 text-balance text-5xl font-bold leading-[1.02] text-ink sm:text-6xl xl:text-7xl"
          >
            {headline.map((w, i) => (
              <motion.span key={i} variants={word} className="mr-[0.28em] inline-block">
                {w}
              </motion.span>
            ))}
            <motion.span variants={word} className="text-gradient inline-block">
              future.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base text-ink/70 sm:text-lg lg:mx-0"
          >
            Wild-fermented sourdough, 27-layer croissants, and signature cakes engineered in
            our Aurora lab — pulled from the oven fresh every single morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href="/products">
              Explore the Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="/about" variant="outline">
              Our Story
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-3 lg:mx-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center lg:text-left">
                <dt className="text-2xl font-bold text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* fullscreen-height gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <HeroGallery />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/25 p-1.5">
          <motion.span
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
