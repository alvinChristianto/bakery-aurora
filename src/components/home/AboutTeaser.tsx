import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  { title: "Slow fermentation", body: "Up to 36 hours so flavour and digestibility develop naturally." },
  { title: "Single-origin grain", body: "Stone-milled in small lots and traceable to the field." },
  { title: "Daily, never frozen", body: "Everything is baked the morning you buy it — full stop." },
];

export default function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] mesh-bg grain p-1">
            <div className="grid h-full place-items-center">
              <span className="text-[10rem] drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] animate-float">
                🥐
              </span>
            </div>
            <div className="glass-dark absolute bottom-5 left-5 rounded-2xl px-5 py-4">
              <p className="text-3xl font-bold text-white">Est. 2026</p>
              <p className="text-xs uppercase tracking-wide text-white/55">The Aurora lab</p>
            </div>
            <div className="glass-dark absolute right-5 top-5 rounded-2xl px-4 py-3">
              <p className="text-sm font-semibold text-white">★ 4.9</p>
              <p className="text-[0.65rem] uppercase tracking-wide text-white/55">2.4k reviews</p>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Old-world craft, <span className="text-gradient">tomorrow’s</span> bakery
              </>
            }
            description="Aurora began with one wild starter and a simple obsession: make the best bread in the city, then keep pushing further. Part bakery, part lab."
          />

          <ul className="mt-8 flex flex-col gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <li className="flex gap-4">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{v.title}</h3>
                    <p className="text-sm text-muted">{v.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Read our story →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
