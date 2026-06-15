"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientMesh from "@/components/ui/GradientMesh";

const headline = ["Crafted", "by", "hand.", "Baked", "for", "the"];

const floaters = [
  { emoji: "🥐", className: "left-[8%] top-[24%] text-5xl sm:text-7xl", depth: 140 },
  { emoji: "🍞", className: "right-[10%] top-[18%] text-5xl sm:text-7xl", depth: 90 },
  { emoji: "🎂", className: "right-[16%] bottom-[16%] text-4xl sm:text-6xl", depth: 200 },
  { emoji: "🥖", className: "left-[14%] bottom-[14%] text-4xl sm:text-6xl", depth: 60 },
  { emoji: "✨", className: "left-[46%] top-[12%] text-3xl sm:text-5xl", depth: 260 },
];

const stats = [
  { value: "36h", label: "Cold ferment" },
  { value: "27", label: "Butter layers" },
  { value: "100%", label: "Small batch" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);

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
    <section
      ref={ref}
      className="mesh-bg grain relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center"
    >
      <GradientMesh />

      {/* floating product stand-ins with scroll parallax */}
      {floaters.map((f) => (
        <Floater
          key={f.emoji + f.className}
          progress={scrollYProgress}
          depth={reduce ? 0 : f.depth}
          emoji={f.emoji}
          className={f.className}
        />
      ))}

      <motion.div style={{ y: yText }} className="relative z-10 mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Future-baked daily
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 text-balance text-5xl font-bold leading-[1.02] text-white sm:text-7xl md:text-8xl"
        >
          {headline.map((w, i) => (
            <motion.span key={i} variants={word} className="mr-[0.28em] inline-block">
              {w}
            </motion.span>
          ))}
          <motion.span variants={word} className="text-gradient glow-text inline-block">
            future.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base text-white/65 sm:text-lg"
        >
          Wild-fermented sourdough, 27-layer croissants, and signature cakes engineered in
          our Aurora lab — pulled from the oven fresh every single morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="/products">
            Explore the Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/about" variant="ghost">
            Our Story
          </MagneticButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-dark rounded-2xl px-4 py-5">
              <dt className="text-2xl font-bold text-white sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-white/55">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
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

function Floater({
  progress,
  depth,
  emoji,
  className,
}: {
  progress: MotionValue<number>;
  depth: number;
  emoji: string;
  className: string;
}) {
  const y = useTransform(progress, [0, 1], [0, depth]);
  return (
    <motion.span
      aria-hidden
      style={{ y }}
      className={`pointer-events-none absolute select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float ${className}`}
    >
      {emoji}
    </motion.span>
  );
}
