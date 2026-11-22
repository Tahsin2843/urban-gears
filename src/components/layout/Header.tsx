"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
const links = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Urban Gears"
            width= {40}
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav: hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-medium hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
         <Link href="/cart" aria-label="Cart" className="relative flex h-11 w-11 items-center justify-center">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
  {count > 0 && (
    <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
      {count}
    </span>
  )}
</Link>

          {/* Menu button: visible on mobile only */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}