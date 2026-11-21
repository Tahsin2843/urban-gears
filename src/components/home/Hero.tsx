import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[70vh] md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Urban Gears
        </p>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Gear up for the everyday.
        </h1>
        <p className="mt-4 max-w-md text-neutral-300 md:text-lg">
          Practical, good-looking essentials, delivered across Bangladesh.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-8 font-bold text-white transition active:scale-[0.98] md:w-auto"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}