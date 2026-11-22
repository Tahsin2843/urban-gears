"use client";

import { useSearchParams } from "next/navigation";

export default function OrderId() {
  const id = useSearchParams().get("id");
  if (!id) return null;

  return (
    <p className="mt-2 text-neutral-500">
      Order number: <b>{id}</b>
    </p>
  );
}