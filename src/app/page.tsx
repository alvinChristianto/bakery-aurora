import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProcessStrip from "@/components/home/ProcessStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import AboutTeaser from "@/components/home/AboutTeaser";
import CtaSection from "@/components/home/CtaSection";
import { buildMetadata, faqJsonLd, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Artisan Sourdough, Pastries & Cakes — Future-Baked Daily",
  description:
    "Aurora Bakehouse crafts wild-fermented sourdough, 27-layer croissants, and signature celebration cakes from scratch every morning. Order online for same-day pickup.",
  path: "/",
});

const faqs = [
  {
    question: "What time does Aurora Bakehouse open?",
    answer:
      "We open at 7 AM Monday–Friday and 8 AM on weekends. We close at 7 PM on weekdays and 4 PM on weekends.",
  },
  {
    question: "Can I order baked goods online?",
    answer:
      "Yes — browse our menu, choose your items, and call or message us to reserve a pickup slot. We bake fresh each morning so orders placed the evening before are guaranteed.",
  },
  {
    question: "Do you offer vegan or gluten-free options?",
    answer:
      "Several of our breads and pastries are vegan — look for the Vegan tag on the menu. We do not currently offer certified gluten-free products as our kitchen handles wheat.",
  },
  {
    question: "Where is Aurora Bakehouse located?",
    answer: `We are at ${siteConfig.contact.address}. Free street parking is available on Lumen Avenue.`,
  },
];

export default function Home() {
  const faqLd = faqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero />
      <ProcessStrip />
      <FeaturedProducts />
      <CategoryShowcase />
      <AboutTeaser />

      {/* FAQ — native disclosure, no JS, no animation */}
      <section className="mx-auto max-w-3xl px-6 py-16" aria-label="Frequently asked questions">
        <h2 className="mb-8 text-2xl font-bold text-ink">Common questions</h2>
        <dl className="divide-y divide-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {faq.question}
                <span aria-hidden className="shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </dl>
      </section>

      <CtaSection />
    </>
  );
}
