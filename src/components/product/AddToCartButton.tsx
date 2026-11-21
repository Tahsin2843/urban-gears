"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  const handleBuy = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      qty
    );
    router.push("/checkout"); // we'll point this to /checkout once it's built
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-neutral-200 bg-white p-3 md:static md:border-0 md:p-0">
      <div className="flex items-center rounded-lg border border-neutral-300">
        <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="h-12 w-11 text-xl">−</button>
        <span className="w-8 text-center font-semibold">{qty}</span>
        <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase quantity" className="h-12 w-11 text-xl">+</button>
      </div>

      <button
        onClick={handleBuy}
        disabled={!product.inStock}
        className="h-12 flex-1 rounded-lg bg-brand font-bold text-white transition active:scale-[0.98] disabled:bg-neutral-300"
      >
        {product.inStock ? `Buy now · ${formatPrice(product.price * qty)}` : "Out of stock"}
      </button>
    </div>
  );
}