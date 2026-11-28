"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { DELIVERY, type Area } from "@/lib/delivery"
import { formatPrice } from "@/lib/utils"

const input =
  "h-12 w-full rounded-lg border border-neutral-300 px-3 text-base outline-none focus:border-brand"

const COLOR_IMAGES: Record<string, string> = {
  "Bottle Green": "/images/products/silicone-water-bottle/bottle-green.jpeg",
  "Grey": "/images/products/silicone-water-bottle/bottle-grey.jpeg",
  "Pink": "/images/products/silicone-water-bottle/bottle-pink.jpeg",
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  console.table(
  items.map((i) => ({
    selectedColor: i.color,
    savedImage: i.image,
    checkoutImage: COLOR_IMAGES[i.color],
  }))
)
  const router = useRouter()

  const [area, setArea] = useState<Area>("dhaka")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [placed, setPlaced] = useState(false)

  const delivery = DELIVERY[area].charge
  const total = subtotal + delivery

  if (items.length === 0 && !placed) {
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const f = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          phone: f.get("phone"),
          address: f.get("address"),
          note: f.get("note"),
          website: f.get("website"),
          area,

          // Include selected color with every product
          items: items.map((i) => ({
            slug: i.slug,
            color: i.color,
            qty: i.qty,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        setLoading(false)
        return
      }

      setPlaced(true)
      clear()

      router.push(`/order-success?id=${data.id}`)
    } catch {
      setError("Network error. Check your connection and try again.")
      setLoading(false)
    }
  }

  const colorHex: Record<string, string> = {
    "Bottle Green": "#315C43",
    Grey: "#92969B",
    Pink: "#E99BAF",
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 pb-28 md:py-10 md:pb-10">
      <h1 className="font-display text-2xl font-bold md:text-3xl">Checkout</h1>

      <p className="mt-1 text-sm text-neutral-500">
        Cash on delivery. Pay when you receive.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        {/* Honeypot */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-semibold">
            Full address
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            autoComplete="street-address"
            placeholder="House, road, area, thana, district"
            className="w-full rounded-lg border border-neutral-300 p-3 text-base outline-none focus:border-brand"
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Delivery area</legend>

          <div className="space-y-2">
            {(Object.keys(DELIVERY) as Area[]).map((key) => (
              <label
                key={key}
                className={`flex h-12 cursor-pointer items-center justify-between rounded-lg border px-3 ${
                  area === key
                    ? "border-brand bg-orange-50"
                    : "border-neutral-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    checked={area === key}
                    onChange={() => setArea(key)}
                    className="accent-[#f25c26]"
                  />
                  {DELIVERY[key].label}
                </span>

                <span className="font-semibold">
                  {formatPrice(DELIVERY[key].charge)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="note" className="mb-1 block text-sm font-semibold">
            Note{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input id="note" name="note" maxLength={300} className={input} />
        </div>

        {/* Order summary */}
        <div className="space-y-3 rounded-lg bg-neutral-50 p-4 text-sm">
          <h2 className="font-bold text-base">Order summary</h2>

          {items.map((i) => (
            <div
              key={`${i.slug}-${i.color}`}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img
  src={COLOR_IMAGES[i.color] ?? i.image}
  alt={`${i.name} - ${i.color}`}
  className="h-16 w-16 rounded-lg border border-neutral-200 object-cover"
/>

                <div>
                  <p className="font-medium">
                    {i.name} × {i.qty}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-neutral-500">
                    <span
                      className="h-3 w-3 rounded-full border border-black/10"
                      style={{
                        backgroundColor: colorHex[i.color] ?? "#D4D4D4",
                      }}
                    />
                    <span>{i.color}</span>
                  </div>
                </div>
              </div>

              <span className="whitespace-nowrap font-semibold">
                {formatPrice(i.price * i.qty)}
              </span>
            </div>
          ))}

          <div className="flex justify-between border-t border-neutral-200 pt-2">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{formatPrice(delivery)}</span>
          </div>

          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold">
            <span>Total</span>
            <span className="text-brand">{formatPrice(total)}</span>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="fixed inset-x-0 bottom-0 border-t border-neutral-200 bg-white p-3 md:static md:border-0 md:p-0">
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-brand font-bold text-white transition active:scale-[0.98] disabled:bg-neutral-300"
          >
            {loading ? "Placing order…" : `Place order · ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </section>
  )
}
