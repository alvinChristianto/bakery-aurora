const items = [
  "Stone-milled grain",
  "36-hour cold ferment",
  "Hand-laminated",
  "Wild sourdough starter",
  "Baked at dawn",
  "Small-batch only",
  "Zero preservatives",
];

/** Infinite marquee band — a bold brand moment between sections. */
export default function ProcessStrip() {
  return (
    <section aria-label="Our craft" className="overflow-hidden bg-primary py-5 text-white">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap will-change-transform">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center gap-8" aria-hidden={dup === 1}>
            {items.map((item) => (
              <li key={item} className="flex items-center gap-8 text-lg font-semibold tracking-tight">
                <span>{item}</span>
                <Spark />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function Spark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="opacity-80">
      <path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
    </svg>
  );
}
