"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const api = useMemo(
    () => ({
      items,
      open,
      setOpen,
      add(product, size, color) {
        setItems((prev) => {
          const key = `${product.slug}|${size}|${color}`;
          const found = prev.find((i) => i.key === key);
          if (found) {
            return prev.map((i) =>
              i.key === key ? { ...i, qty: i.qty + 1 } : i
            );
          }
          return [
            ...prev,
            {
              key,
              slug: product.slug,
              name: product.name,
              price: product.price,
              size,
              color,
              qty: 1,
            },
          ];
        });
        setOpen(true);
      },
      remove(key) {
        setItems((prev) => prev.filter((i) => i.key !== key));
      },
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
    }),
    [items, open]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
