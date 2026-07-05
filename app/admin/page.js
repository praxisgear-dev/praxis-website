"use client";

import { useEffect, useState } from "react";
import { products as baseProducts } from "@/lib/products";
import { readStore, writeStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

const PASSCODE = "praxis2026";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [store, setStore] = useState({ edits: {}, custom: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("praxis-admin") === "1") setAuthed(true);
    } catch (e) {}
    setStore(readStore());
  }, []);

  function login(e) {
    e.preventDefault();
    if (code === PASSCODE) {
      setAuthed(true);
      try {
        sessionStorage.setItem("praxis-admin", "1");
      } catch (err) {}
    }
  }

  function save(next) {
    setStore(next);
    writeStore(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  function setEdit(slug, field, value) {
    const next = {
      ...store,
      edits: {
        ...store.edits,
        [slug]: { ...(store.edits[slug] || {}), [field]: value },
      },
    };
    save(next);
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-5 pt-24">
        <div className="clay p-8 text-center">
          <h1 className="font-serif text-2xl">Admin</h1>
          <form onSubmit={login} className="mt-6">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Passcode"
              className="w-full bg-paper border border-line rounded-full px-5 py-3 text-sm text-center outline-none focus:border-ink"
            />
            <button className="btn-primary w-full mt-4">Enter</button>
          </form>
          <p className="text-xs text-muted mt-4">
            Demo gate — replace with real auth before launch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-16 pb-10">
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="eyebrow mb-2">Back office</p>
          <h1 className="font-serif text-3xl md:text-4xl">Products</h1>
        </div>
        <p
          className={`text-xs transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}
        >
          Saved ✓
        </p>
      </div>
      <p className="text-sm text-muted mt-2 max-w-lg">
        Changes save to this browser instantly and apply across the site —
        prices, discounts, stock and visibility. Connect a real database
        before launch to make them global.
      </p>

      {/* Existing products */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-3 pr-4 font-medium">Product</th>
              <th className="py-3 pr-4 font-medium">Base price</th>
              <th className="py-3 pr-4 font-medium">Price (₹)</th>
              <th className="py-3 pr-4 font-medium">Discount %</th>
              <th className="py-3 pr-4 font-medium">Stock</th>
              <th className="py-3 font-medium">Visible</th>
            </tr>
          </thead>
          <tbody>
            {baseProducts.map((p) => {
              const e = store.edits[p.slug] || {};
              return (
                <tr key={p.slug} className="border-b border-line">
                  <td className="py-3 pr-4">
                    {p.name}
                    <span className="block text-xs text-muted">
                      {p.gender} · {p.type}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted">{formatPrice(p.price)}</td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      value={e.price ?? p.price}
                      onChange={(ev) => setEdit(p.slug, "price", Number(ev.target.value) || p.price)}
                      className="w-24 bg-paper border border-line rounded-lg px-3 py-1.5 outline-none focus:border-ink"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={e.discount ?? 0}
                      onChange={(ev) => setEdit(p.slug, "discount", Math.max(0, Math.min(90, Number(ev.target.value) || 0)))}
                      className="w-20 bg-paper border border-line rounded-lg px-3 py-1.5 outline-none focus:border-ink"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      min="0"
                      value={e.inventory ?? 25}
                      onChange={(ev) => setEdit(p.slug, "inventory", Math.max(0, Number(ev.target.value) || 0))}
                      className="w-20 bg-paper border border-line rounded-lg px-3 py-1.5 outline-none focus:border-ink"
                    />
                  </td>
                  <td className="py-3">
                    <input
                      type="checkbox"
                      checked={!(e.hidden ?? false)}
                      onChange={(ev) => setEdit(p.slug, "hidden", !ev.target.checked)}
                      className="w-4 h-4 accent-current"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Custom products */}
      <CustomProducts store={store} save={save} />
    </div>
  );
}

function CustomProducts({ store, save }) {
  const empty = {
    name: "",
    gender: "Men",
    type: "Shorts",
    price: "",
    headline: "",
    images: "",
  };
  const [form, setForm] = useState(empty);

  function addProduct(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const slug =
      "custom-" +
      form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const images = form.images
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    const product = {
      slug,
      name: form.name,
      gender: form.gender,
      type: form.type,
      price: Number(form.price),
      headline: form.headline || `${form.name} — new from Praxis`,
      feeling: form.headline || "",
      images: images.length ? images : undefined,
      designedFor: "Daily training",
      care: "Machine wash cold",
      fabricTech: "",
      details: { fabric: "—", construction: "—", features: "—", weight: "—", fit: "True to size" },
    };
    save({ ...store, custom: [...(store.custom || []), product] });
    setForm(empty);
  }

  function removeCustom(slug) {
    save({ ...store, custom: store.custom.filter((p) => p.slug !== slug) });
  }

  return (
    <div className="mt-14 grid md:grid-cols-2 gap-8">
      <div className="clay p-7">
        <h2 className="font-serif text-2xl">Add a product</h2>
        <form onSubmit={addProduct} className="mt-5 space-y-3 text-sm">
          <input
            placeholder="Product name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 outline-none focus:border-ink"
          />
          <div className="flex gap-3">
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="flex-1 bg-paper border border-line rounded-lg px-3 py-2.5 outline-none"
            >
              <option>Men</option>
              <option>Women</option>
            </select>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="flex-1 bg-paper border border-line rounded-lg px-3 py-2.5 outline-none"
            >
              <option>Shorts</option>
              <option>Tees</option>
            </select>
            <input
              type="number"
              placeholder="Price ₹ *"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-28 bg-paper border border-line rounded-lg px-3 py-2.5 outline-none focus:border-ink"
            />
          </div>
          <input
            placeholder="One-line headline"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 outline-none focus:border-ink"
          />
          <textarea
            placeholder="Image URLs — one per line (leave empty for line-art placeholder)"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            rows={3}
            className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 outline-none focus:border-ink resize-none"
          />
          <button className="btn-primary w-full">Add product</button>
        </form>
      </div>

      <div>
        <h2 className="font-serif text-2xl">Custom products</h2>
        {!store.custom?.length ? (
          <p className="text-sm text-muted mt-4">
            None yet — products you add appear here and in the shop.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {store.custom.map((p) => (
              <div
                key={p.slug}
                className="clay-sm p-4 flex items-center justify-between gap-3 text-sm"
              >
                <div>
                  <p>{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.gender} · {p.type} · {formatPrice(p.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeCustom(p.slug)}
                  className="text-xs text-muted underline hover:text-ink"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
