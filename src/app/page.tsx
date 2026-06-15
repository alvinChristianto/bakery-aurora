import Hero from "@/components/home/Hero";
import ProcessStrip from "@/components/home/ProcessStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import AboutTeaser from "@/components/home/AboutTeaser";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessStrip />
      <FeaturedProducts />
      <CategoryShowcase />
      <AboutTeaser />
      <CtaSection />
    </>
  );
}
