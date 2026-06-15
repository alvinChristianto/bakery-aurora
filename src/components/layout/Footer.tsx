import Link from "next/link";
import { categories } from "@/data/products";
import { siteConfig } from "@/lib/seo";
import GradientMesh from "@/components/ui/GradientMesh";

export default function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-ink text-white">
      <GradientMesh className="opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <span className="text-xl font-bold">
              Aurora<span className="text-primary">.</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              A futuristic craft bakery. {siteConfig.tagline} Stone-milled grain, wild starters,
              and a little bit of science.
            </p>
            <div className="mt-6 flex gap-3">
              <Social href={siteConfig.links.instagram} label="Instagram">
                <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3zm2.8 13.5a2.8 2.8 0 0 1-2.8 2.8h-9a2.8 2.8 0 0 1-2.8-2.8v-9a2.8 2.8 0 0 1 2.8-2.8h9a2.8 2.8 0 0 1 2.8 2.8z" />
              </Social>
              <Social href={siteConfig.links.twitter} label="X">
                <path d="M17.5 4h2.6l-5.7 6.5L21 20h-5.2l-4-5.3L7 20H4.4l6-6.9L3.4 4h5.3l3.6 4.8L17.5 4zm-.9 14.4h1.4L8 5.5H6.5l10.1 12.9z" />
              </Social>
            </div>
          </div>

          <FooterCol title="Explore">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/products">Products</FooterLink>
            <FooterLink href="/about">About</FooterLink>
          </FooterCol>

          <FooterCol title="Menu">
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`/products?category=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Visit">
            <li className="text-sm text-white/60">{siteConfig.contact.address}</li>
            <li>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-white/60 hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-white/60 hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Future-baked with care · {siteConfig.contact.address.split(",")[1]?.trim()}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/60 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
