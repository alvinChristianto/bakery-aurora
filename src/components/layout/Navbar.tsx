"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/seo";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const id = requestAnimationFrame(onScroll); // sync initial state off the effect body
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
          scrolled || open
            ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
          <span className="text-base font-bold tracking-tight text-ink">
            Aurora<span className="text-primary">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary-tint"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="/products" className="px-5 py-2.5 text-sm">
            Order Online
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] h-0.5 w-5 bg-white transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-5 bg-white transition-transform duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-[4.5rem] z-40 md:hidden"
          >
            <div className="glass flex flex-col gap-1 rounded-3xl p-3 shadow-2xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-primary-tint"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={closeMenu}
                className="mt-1 rounded-2xl bg-primary px-4 py-3 text-center text-base font-semibold text-white"
              >
                Order Online
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_8px_20px_-6px_rgba(255,51,51,0.7)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2.5l2.4 5.8 6.1.5-4.7 4 1.5 6-5.3-3.3L6.7 18.8l1.5-6L3.5 8.8l6.1-.5L12 2.5z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
