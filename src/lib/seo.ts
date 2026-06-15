import type { Metadata } from "next";

export const siteConfig = {
  name: "Aurora Bakehouse",
  shortName: "Aurora",
  tagline: "Future-baked daily.",
  description:
    "Aurora Bakehouse is a futuristic craft bakery — sourdough breads, laminated pastries, and signature cakes baked fresh every morning. Order online for pickup.",
  // Override in production via NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurora-bakehouse.example.com",
  locale: "en_US",
  links: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
  contact: {
    phone: "+1 (555) 010-2026",
    email: "hello@aurorabakehouse.com",
    address: "118 Lumen Avenue, Northside, CA 90210",
  },
} as const;

type BuildMetaArgs = {
  title?: string;
  description?: string;
  path?: string;
};

/** Shared metadata builder so every route gets consistent OG/Twitter/canonical tags. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: BuildMetaArgs = {}): Metadata {
  const url = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description,
      url,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
    },
  };
}

/** schema.org Bakery / LocalBusiness — rendered as JSON-LD in the root layout. */
export function bakeryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "$$",
    servesCuisine: "Bakery",
    address: {
      "@type": "PostalAddress",
      streetAddress: "118 Lumen Avenue",
      addressLocality: "Northside",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    sameAs: [siteConfig.links.instagram, siteConfig.links.twitter],
  };
}
