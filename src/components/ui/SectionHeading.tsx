import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 self-start rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
            align === "center" && "self-center",
            light
              ? "border-white/15 bg-white/5 text-white/80"
              : "border-primary/20 bg-primary-tint text-primary",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-2xl text-4xl font-bold sm:text-5xl",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl text-base sm:text-lg", light ? "text-white/65" : "text-muted")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
