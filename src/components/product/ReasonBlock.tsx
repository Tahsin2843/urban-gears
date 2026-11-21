import Image from "next/image";
import type { Product } from "@/types/product";

export default function ReasonBlocks({ product }: { product: Product }) {
  const blocks = product.reasonBlocks;
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-2xl font-bold text-ink md:text-4xl">
          {blocks.length} reasons to choose {product.name}
        </h2>

        <div className="mt-10 space-y-12 md:mt-16 md:space-y-20">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-14"
            >
              <div
                className={`relative aspect-square overflow-hidden rounded-2xl bg-neutral-200 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-brand">Reason {i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600 md:text-lg">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}