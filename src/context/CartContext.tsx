"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const KEY = "urban-gears-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load saved cart once, after the page loads in the browser
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // Save on every change (only after the first load, so we don't wipe it)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add: CartContextType["add"] = (item, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug);
      if (found) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: Math.min(10, i.qty + qty) } : i
        );
      }
      return [...prev, { ...item, qty }];
    });

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i
      )
    );

  const remove = (slug: string) =>
    setItems((prev) => prev.filter((i) => i.slug !== slug));

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, add, setQty, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}