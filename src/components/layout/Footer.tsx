import Link from "next/link";
import { Suspense } from "react";
import Year from "./Year";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          {/* Swap for logo-light.svg once you have it */}
          <p className="font-display text-2xl font-bold">
            Urban <span className="text-brand">Gears</span>
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Quality gear, delivered to your door.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">Help</p>
          <Link href="/policies/shipping-returns" className="text-neutral-300 hover:text-white">Shipping &amp; Returns</Link>
          <Link href="/policies/privacy" className="text-neutral-300 hover:text-white">Privacy Policy</Link>
          <Link href="/policies/terms" className="text-neutral-300 hover:text-white">Terms</Link>
          <Link href="/contact" className="text-neutral-300 hover:text-white">Contact</Link>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Follow us</p>
          <p className="mt-2 text-neutral-300">Facebook · Instagram</p>
          {/* Replace with real links later */}
        </div>
      </div>
      <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">
        © <Suspense fallback="2026"><Year /></Suspense> Urban Gears. All rights reserved.
      </div>
    </footer>
  );
}