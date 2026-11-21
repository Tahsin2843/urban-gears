import Link from "next/link";

export const metadata = { title: "Order placed" };

export default async function OrderSuccess({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <section className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-5xl">✅</p>
      <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
        Thank you! Your order is placed.
      </h1>
      {id && <p className="mt-2 text-neutral-500">Order number: <b>{id}</b></p>}
      <p className="mt-4 text-neutral-700">
        We'll call you soon to confirm your order. Please keep your phone nearby.
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