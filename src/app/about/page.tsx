import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientMesh from "@/components/ui/GradientMesh";
import CtaSection from "@/components/home/CtaSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "The story behind Aurora Bakehouse — a futuristic craft bakery blending old-world fermentation with modern technique. Meet the team and our process.",
  path: "/about",
});

const values = [
  { icon: "🌾", title: "Grain first", body: "Single-origin, stone-milled, and traceable. Flavour starts in the field." },
  { icon: "⏳", title: "Time over shortcuts", body: "Long, cold ferments — never additives — build our crumb and crust." },
  { icon: "🔬", title: "A baker’s lab", body: "We treat recipes like experiments and chase tiny improvements daily." },
  { icon: "♻️", title: "Low waste", body: "Yesterday’s loaves become today’s croutons, crumbs, and starters." },
];

const process = [
  { step: "01", title: "Mill & mix", body: "Grain is milled in small lots and folded into a wild-yeast levain." },
  { step: "02", title: "Slow ferment", body: "Doughs rest cold for up to 36 hours to develop depth and structure." },
  { step: "03", title: "Shape by hand", body: "Every loaf and pastry is shaped, scored, and laminated by hand." },
  { step: "04", title: "Bake at dawn", body: "Stone-deck ovens fire before sunrise so everything peaks at open." },
];

const team = [
  { name: "Mara Vela", role: "Head Baker & Founder", emoji: "👩‍🍳", accent: "#ff3333" },
  { name: "Idris Cole", role: "Lead Pastry Chef", emoji: "🧑‍🍳", accent: "#e0a73e" },
  { name: "Suki Tan", role: "Cake Designer", emoji: "👩‍🎨", accent: "#ff5e8a" },
  { name: "Theo Marsh", role: "Fermentation Lead", emoji: "🧪", accent: "#5fa463" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="mesh-bg grain relative isolate overflow-hidden px-6 pb-24 pt-40 text-center">
        <GradientMesh />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Since 2026
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-5xl font-bold text-white sm:text-7xl">
              We bake <span className="text-gradient glow-text">the future</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/65 sm:text-lg">
              Aurora Bakehouse is where old-world fermentation meets a maker’s lab. We started
              with one stubborn sourdough starter and a belief that bread could be both deeply
              traditional and genuinely new.
            </p>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream p-1">
              <div className="grid h-full place-items-center bg-gradient-to-br from-primary-tint to-cream">
                <span className="text-[11rem] animate-float">🍞</span>
              </div>
              <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-4">
                <p className="text-2xl font-bold text-ink">1 wild starter</p>
                <p className="text-xs uppercase tracking-wide text-muted">still going strong</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  From a home oven to a <span className="text-gradient">neighbourhood lab</span>
                </>
              }
            />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
              <Reveal>
                <p>
                  What began as weekend loaves shared with neighbours quickly outgrew the
                  kitchen. We opened the bakehouse to do one thing properly: make bread and
                  pastry worth waking up early for.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Today our team mills grain in-house, runs long cold ferments, and prototypes
                  new bakes every week. The “futuristic” part isn’t gimmick — it’s a mindset of
                  measuring, tasting, and refining until each bite is exactly right.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title={<>Principles we <span className="text-gradient">bake by</span></>}
            className="mx-auto items-center"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(255,51,51,0.4)]">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-tint text-2xl">
                    {v.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="The process"
          title={<>Four steps, <span className="text-gradient">zero shortcuts</span></>}
          description="The same rhythm runs every single day, from grain to golden crust."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.07} className="h-full">
              <div className="group h-full bg-surface p-7 transition-colors duration-500 hover:bg-ink">
                <span className="text-4xl font-bold text-primary">{p.step}</span>
                <h3 className="mt-4 text-lg font-bold text-ink transition-colors group-hover:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-white/65">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* team */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="The makers"
            title={<>The hands behind <span className="text-gradient">the bake</span></>}
            className="mx-auto items-center"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.07}>
                <div className="group overflow-hidden rounded-3xl border border-line bg-surface text-center">
                  <div
                    className="relative grid aspect-square place-items-center"
                    style={{ background: `radial-gradient(120% 120% at 30% 20%, ${member.accent}33, transparent 70%)` }}
                  >
                    <span className="text-7xl transition-transform duration-500 group-hover:scale-110">
                      {member.emoji}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink">{member.name}</h3>
                    <p className="mt-1 text-sm text-primary">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-8">
        <CtaSection />
      </div>
    </>
  );
}
