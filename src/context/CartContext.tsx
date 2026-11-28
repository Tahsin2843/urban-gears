
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, color: string, qty: number) => void;
  remove: (slug: string, color: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const KEY = "urban-gears-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load saved cart
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);

      if (raw) {
        const savedItems = JSON.parse(raw);

        if (Array.isArray(savedItems)) {
          setItems(
            savedItems.map((item) => ({
              ...item,
              color:
                typeof item.color === "string"
                  ? item.color
                  : "Previously added (color not recorded)",
            }))
          );
        }
      }
    } catch {
      console.error("Failed to load cart");
    }

    setReady(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      console.error("Failed to save cart");
    }
  }, [items, ready]);

  // Add item
  const add: CartContextType["add"] = (item, qty = 1) =>
    setItems((prev) => {
      const found = prev.find(
        (i) => i.slug === item.slug && i.color === item.color
      );

      if (found) {
        return prev.map((i) =>
          i.slug === item.slug && i.color === item.color
            ? { ...i, qty: Math.min(10, i.qty + qty) }
            : i
        );
      }

      return [
        ...prev,
        { ...item, qty: Math.max(1, Math.min(10, qty)) },
      ];
    });

  // Update quantity
  const setQty: CartContextType["setQty"] = (
    slug,
    color,
    qty
  ) =>
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.color === color
          ? { ...i, qty: Math.max(1, Math.min(10, qty)) }
          : i
      )
    );

  // Remove specific color
  const remove: CartContextType["remove"] = (slug, color) =>
    setItems((prev) =>
      prev.filter(
        (i) => !(i.slug === slug && i.color === color)
      )
    );

  // Clear cart
  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);

  const subtotal = items.reduce(
    (n, i) => n + i.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        add,
        setQty,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}
