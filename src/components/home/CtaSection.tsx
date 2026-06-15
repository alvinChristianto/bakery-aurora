import Reveal from "@/components/ui/Reveal";
import GradientMesh from "@/components/ui/GradientMesh";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/lib/seo";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <Reveal>
        <div className="mesh-bg grain relative isolate overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-16">
          <GradientMesh />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-white sm:text-6xl">
              Ready to taste <span className="text-gradient glow-text">the future?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/65 sm:text-lg">
              Reserve your morning batch online and skip the queue, or drop by the bakehouse
              and watch the ovens at work.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/products">Order Online</MagneticButton>
              <MagneticButton href={`tel:${siteConfig.contact.phone}`} variant="ghost">
                Call the bakehouse
              </MagneticButton>
            </div>
            <p className="mt-8 text-sm text-white/45">{siteConfig.contact.address}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
