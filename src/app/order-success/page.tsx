import { Suspense } from "react";
import Link from "next/link";
import OrderId from "./OrderId";

export const metadata = { title: "Order placed" };

export default function OrderSuccess() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-5xl">✅</p>
      <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
        Thank you! Your order is placed.
      </h1>

      <Suspense fallback={null}>
        <OrderId />
      </Suspense>

      <p className="mt-4 text-neutral-700">
        We&apos;ll call you soon to confirm your order. Please keep your phone nearby.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex h-12 items-center rounded-lg bg-brand px-8 font-bold text-white"
      >
        Continue shopping
      </Link>
    </section>
  );
}