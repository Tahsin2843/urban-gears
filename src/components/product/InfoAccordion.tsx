import type { Product } from "@/types/product";

type Props = { sections: NonNullable<Product["infoSections"]> };

export default function InfoAccordion({ sections }: Props) {
  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {sections.map((s) => (
        <details key={s.title} open={s.open} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold [&::-webkit-details-marker]:hidden">
            {s.title}
            <span
              aria-hidden
              className="text-xl text-brand transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-600">
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {s.qa?.map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-ink">{item.q}</p>
                <p className="mt-0.5">{item.a}</p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}