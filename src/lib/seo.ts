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
    instagram: "https://instagram.com/aurorabakehouse",
    twitter: "https://x.com/aurorabakehouse",
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
    sameAs: [siteConfig.links.instagram, siteConfig.links.twitter].filter(Boolean),
  };
}

type ProductJsonLdArgs = {
  name: string;
  description: string;
  categorySlug: string;
  slug: string;
  id: string;
  lowPrice: string;
  highPrice: string;
};

/** schema.org Product — use on /products/[slug] pages. */
export function productJsonLd({ name, description, categorySlug, slug, id, lowPrice, highPrice }: ProductJsonLdArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku: id,
    category: categorySlug,
    url: `${siteConfig.url}/products/${slug}`,
    image: `${siteConfig.url}/opengraph-image`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "AggregateOffer",
      lowPrice,
      highPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

/** schema.org BreadcrumbList — add to detail pages that have breadcrumb UI. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** schema.org ItemList of Person — use on the about page team section. */
export function teamPersonsJsonLd(members: { name: string; jobTitle: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: members.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.jobTitle,
        worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      },
    })),
  };
}

/** schema.org HowTo — use on the about page process section. */
export function howToJsonLd(args: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** schema.org FAQPage — use on the homepage FAQ section. */
export function faqJsonLd(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}
