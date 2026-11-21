import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all Urban Gears products.",
};

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <h1 className="font-display text-2xl font-bold md:text-3xl">All products</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}