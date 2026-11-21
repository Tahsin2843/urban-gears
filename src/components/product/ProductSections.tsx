import Image from "next/image";
import type { Product } from "@/types/product";

export default function ProductSections({ product }: { product: Product }) {
  const { features, steps, guarantee, faqs } = product;

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:space-y-16 md:py-14">
      {features && features.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Why you'll love it</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="overflow-hidden rounded-xl bg-neutral-50">
                {f.image ? (
                  <div className="relative aspect-[4/3] bg-neutral-200">
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  f.icon && (
                    <p className="px-4 pt-4 text-3xl" aria-hidden>
                      {f.icon}
                    </p>
                  )
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {steps && steps.length > 0 && (
        <section className="rounded-2xl bg-neutral-50 p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">How to use</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={i}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
              >
                {s.image && (
                  <div className="relative aspect-[4/3] bg-neutral-200">
                    <Image
                      src={s.image}
                      alt={`Step ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm font-bold text-brand">Step {i + 1}</p>
                  <p className="mt-1 text-neutral-700">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {guarantee && (
        <section className="rounded-xl border-2 border-brand p-5 text-center">
          <p className="text-2xl" aria-hidden>🛡️</p>
          <p className="mt-1 font-semibold">{guarantee}</p>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Questions</h2>
          <div className="mt-5 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-xl text-brand transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}