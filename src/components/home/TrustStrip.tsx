const items = [
  { icon: "🚚", title: "Fast delivery", text: "Across Bangladesh" },
  { icon: "💵", title: "Cash on delivery", text: "Pay when you receive" },
  { icon: "🔄", title: "Easy returns", text: "Hassle-free exchange" },
];

export default function TrustStrip() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden>
              {i.icon}
            </span>
            <div>
              <p className="font-semibold">{i.title}</p>
              <p className="text-sm text-neutral-500">{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}