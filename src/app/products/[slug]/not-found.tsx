import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 text-7xl" aria-hidden>
        🥖
      </span>
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">
        Loaf not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
        That pastry must have been a limited run — we couldn&apos;t find what
        you&apos;re looking for.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-dark"
      >
        Back to menu
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
