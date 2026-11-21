import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded bg-ink px-2 py-1 text-xs font-semibold text-white">
            Sold out
          </span>
        )}
      </div>

      <h3 className="mt-2 text-sm font-semibold leading-snug md:text-base">
        {product.name}
      </h3>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-bold text-brand">{formatPrice(product.price)}</span>
        {product.comparePrice && (
          <span className="text-xs text-neutral-400 line-through">
            {formatPrice(product.comparePrice)}
          </span>
        )}
      </div>
    </Link>
  );
}