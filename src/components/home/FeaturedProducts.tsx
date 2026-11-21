import Link from "next/link";
import { getFeatured } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const featured = getFeatured();
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Featured
        </h2>
        <Link href="/products" className="text-sm font-semibold text-brand">
          View all →
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}