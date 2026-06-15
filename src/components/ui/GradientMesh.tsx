import { cn } from "@/lib/utils";

/** Decorative animated aurora blobs for dark sections. Purely presentational. */
export default function GradientMesh({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/40 blur-[120px] animate-float" />
      <div
        className="absolute right-[-6rem] top-10 h-[22rem] w-[22rem] rounded-full bg-[#ff7a47]/30 blur-[120px] animate-float"
        style={{ animationDelay: "-2.5s" }}
      />
      <div
        className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-primary/30 blur-[130px] animate-float"
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}
