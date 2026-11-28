
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const colors = [
  { name: "Bottle Green", hex: "#315C43" },
  { name: "Grey", hex: "#92969B" },
  { name: "Pink", hex: "#E99BAF" },
];

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const { add } = useCart();
  const router = useRouter();

  const handleBuy = () => {
    if (!selectedColor) return;

    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
      },
      qty
    );

    router.push("/checkout");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-3 border-t border-neutral-200 bg-white p-3 md:static md:border-0 md:p-0">

      {/* Color Selection */}
      <div>
        <p className="mb-2 text-sm font-semibold text-neutral-800">
          Choose Color
          {selectedColor && (
            <span className="ml-2 font-normal text-neutral-500">
              · {selectedColor}
            </span>
          )}
        </p>

        <div className="flex gap-3">
          {colors.map((color) => {
            const selected = selectedColor === color.name;

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select ${color.name}`}
                aria-pressed={selected}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                  selected
                    ? "border-brand bg-neutral-50 ring-1 ring-brand"
                    : "border-neutral-300"
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity and Buy Now */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-neutral-300">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="h-12 w-11 text-xl"
          >
            −
          </button>

          <span className="w-8 text-center font-semibold">
            {qty}
          </span>

          <button
            onClick={() => setQty(Math.min(10, qty + 1))}
            aria-label="Increase quantity"
            className="h-12 w-11 text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={handleBuy}
          disabled={!product.inStock || !selectedColor}
          className="h-12 flex-1 rounded-lg bg-brand font-bold text-white transition active:scale-[0.98] disabled:bg-neutral-300"
        >
          {!product.inStock
            ? "Out of stock"
            : !selectedColor
              ? "Choose a Color"
              : `Buy now · ${formatPrice(product.price * qty)}`}
        </button>
      </div>
    </div>
  );
}
