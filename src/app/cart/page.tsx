"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, subtotal, setQty, remove } = useCart()

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center rounded-lg bg-brand px-8 font-bold text-white"
        >
          Continue shopping
        </Link>
      </section>
    )
  }

  const colorHex: Record<string, string> = {
    "Bottle Green": "#315C43",
    Grey: "#92969B",
    Pink: "#E99BAF",
  }

  const COLOR_IMAGES: Record<string, string> = {
    "Bottle Green": "/images/products/silicone-water-bottle/bottle-green.jpeg",
    Grey: "/images/products/silicone-water-bottle/bottle-grey.jpeg",
    Pink: "/images/products/silicone-water-bottle/bottle-pink.jpeg",
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 pb-28 md:py-10 md:pb-10">
      <h1 className="font-display text-2xl font-bold md:text-3xl">Your cart</h1>

      <ul className="mt-5 divide-y divide-neutral-200">
        {items.map((i) => (
          <li key={`${i.slug}-${i.color}`} className="flex gap-3 py-4">
            <Link
              href={`/products/${i.slug}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100"
            >
              <Image
                src={COLOR_IMAGES[i.color] ?? i.image}
                alt={`${i.name} - ${i.color}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold leading-snug">{i.name}</p>

                  {/* Selected Color */}
                  <div className="mt-1 flex items-center gap-2 text-sm text-neutral-600">
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                      style={{
                        backgroundColor: colorHex[i.color] ?? "#D4D4D4",
                      }}
                    />
                    <span>{i.color}</span>
                  </div>
                </div>

                <button
                  onClick={() => remove(i.slug, i.color)}
                  aria-label={`Remove ${i.name} - ${i.color}`}
                  className="h-8 w-8 text-neutral-400"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-lg border border-neutral-300">
                  <button
                    onClick={() => setQty(i.slug, i.color, i.qty - 1)}
                    aria-label="Decrease quantity"
                    className="h-10 w-10 text-lg"
                  >
                    −
                  </button>

                  <span className="w-7 text-center font-semibold">{i.qty}</span>

                  <button
                    onClick={() => setQty(i.slug, i.color, i.qty + 1)}
                    aria-label="Increase quantity"
                    className="h-10 w-10 text-lg"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-brand">
                  {formatPrice(i.price * i.qty)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-neutral-600">Subtotal</span>
        <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
      </div>

      <p className="mt-1 text-sm text-neutral-500">
        Delivery charge is added at checkout.
      </p>

      <div className="fixed inset-x-0 bottom-0 border-t border-neutral-200 bg-white p-3 md:static md:mt-6 md:border-0 md:p-0">
        <Link
          href="/checkout"
          className="flex h-12 w-full items-center justify-center rounded-lg bg-brand font-bold text-white active:scale-[0.98]"
        >
          Checkout
        </Link>
      </div>
    </section>
  )
}
