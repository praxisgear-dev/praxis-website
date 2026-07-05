"use client";

import { useEffect, useState } from "react";
import { products as baseProducts } from "./products";

/* Client-side product overrides + custom products + orders.
   Stored in localStorage until a real backend/CMS is connected. */

const KEY = "praxis-store";
const ORDERS_KEY = "praxis-orders";

export function readStore() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { edits: {}, custom: [] };
  } catch (e) {
    return { edits: {}, custom: [] };
  }
}

export function writeStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    window.dispatchEvent(new Event("praxis-store-changed"));
  } catch (e) {}
}

export function mergeProducts(store) {
  const merged = baseProducts
    .map((p) => {
      const e = store.edits[p.slug] || {};
      return {
        ...p,
        price: e.price ?? p.price,
        discount: e.discount ?? 0,
        inventory: e.inventory ?? 25,
        hidden: e.hidden ?? false,
      };
    })
    .filter((p) => !p.hidden);
  const custom = (store.custom || []).map((p) => ({
    discount: 0,
    inventory: 10,
    colors: [{ name: "Black", hex: "#232323" }],
    isNew: true,
    added: new Date().toISOString().slice(0, 10),
    details: {},
    ...p,
  }));
  return [...merged, ...custom];
}

export function effectivePrice(p) {
  if (!p.discount) return p.price;
  return Math.round(p.price * (1 - p.discount / 100));
}

export function useProducts() {
  const [list, setList] = useState(() => mergeProducts({ edits: {}, custom: [] }));
  useEffect(() => {
    const refresh = () => setList(mergeProducts(readStore()));
    refresh();
    window.addEventListener("praxis-store-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("praxis-store-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return list;
}

/* Orders */
export function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function recordOrder(items, total) {
  try {
    const orders = readOrders();
    orders.unshift({
      id: "PRX-" + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      items,
      total,
      status: "Placed via WhatsApp",
    });
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {}
}
