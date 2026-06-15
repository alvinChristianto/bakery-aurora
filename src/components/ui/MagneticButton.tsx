"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "ghost" | "outline";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-bright shadow-[0_12px_40px_-10px_rgba(255,51,51,0.7)]",
  outline:
    "border border-primary/40 text-primary hover:bg-primary hover:text-white",
  ghost: "text-white/90 hover:text-white border border-white/20 hover:border-white/40",
};

/** Button/link that drifts toward the cursor — a subtle magnetic micro-interaction. */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, variants[variant], className);
  const motionProps = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        aria-label={ariaLabel}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
