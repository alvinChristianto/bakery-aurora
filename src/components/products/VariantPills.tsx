import type { Variant } from "@/data/products";

export default function VariantPills({ variants, max = 3 }: { variants: Variant[]; max?: number }) {
  const shown = variants.slice(0, max);
  const extra = variants.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Available variants">
      {shown.map((v) => (
        <li
          key={v.name}
          className="rounded-full border border-line bg-mist px-2.5 py-1 text-[0.7rem] font-medium text-muted"
        >
          {v.name}
        </li>
      ))}
      {extra > 0 && (
        <li className="rounded-full border border-primary/20 bg-primary-tint px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
          +{extra} more
        </li>
      )}
    </ul>
  );
}
