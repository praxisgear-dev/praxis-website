"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readOrders } from "@/lib/store";
import { formatPrice } from "@/lib/products";

/* Sample workouts shown after "connecting" Strava.
   Real Strava sync needs OAuth + a small backend — wire up at launch. */
const sampleRuns = [
  { name: "Morning Run — Riverfront", dist: "8.2 km", pace: "5:24 /km", time: "44:17", date: "Today" },
  { name: "Tempo Tuesday", dist: "6.0 km", pace: "4:58 /km", time: "29:48", date: "2 days ago" },
  { name: "Long Run — Ellis Bridge loop", dist: "16.4 km", pace: "5:51 /km", time: "1:35:58", date: "Sunday" },
  { name: "Easy shakeout", dist: "4.1 km", pace: "6:22 /km", time: "26:06", date: "Last week" },
];

export default function AccountPage() {
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [strava, setStrava] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOrders(readOrders());
    try {
      setStrava(localStorage.getItem("praxis-strava") === "on");
    } catch (e) {}
  }, []);

  function toggleStrava() {
    const next = !strava;
    setStrava(next);
    try {
      localStorage.setItem("praxis-strava", next ? "on" : "off");
    } catch (e) {}
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-10 md:pt-16">
      <p className="eyebrow mb-2">Your space</p>
      <h1 className="font-serif text-3xl md:text-4xl">My Account</h1>

      <div className="clay-sm inline-flex p-1 rounded-full mt-8">
        {[
          ["orders", "Order History"],
          ["workouts", "My Runs"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-6 py-2 text-xs uppercase tracking-[0.14em] rounded-full transition-colors ${
              tab === key ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <section className="mt-10 fade-up">
          {!mounted ? null : orders.length === 0 ? (
            <div className="clay p-10 text-center">
              <p className="font-serif text-2xl">No orders yet.</p>
              <p className="text-sm text-muted mt-3">
                Orders you place appear here, on this device.
              </p>
              <Link href="/shop" className="btn-primary mt-6">
                Browse the catalogue
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="clay p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm">
                      {o.id}
                      <span className="text-muted"> · {new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </p>
                    <p className="eyebrow">{o.status}</p>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-muted">
                    {o.items.map((i) => (
                      <p key={i.key}>
                        {i.name} — {i.color}, {i.size} × {i.qty}
                      </p>
                    ))}
                  </div>
                  <p className="mt-4 pt-3 border-t border-line text-sm">
                    Total {formatPrice(o.total)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "workouts" && (
        <section className="mt-10 fade-up">
          <div className="clay p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h2 className="text-lg">Connect your running apps</h2>
              <p className="text-sm text-muted mt-1 max-w-sm">
                Pull in your recent runs from Strava, Garmin or Nike Run Club.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={toggleStrava}
                className={strava ? "btn-outline" : "btn-primary"}
              >
                {strava ? "Disconnect Strava" : "Connect Strava"}
              </button>
            </div>
          </div>
          <p className="text-xs text-muted mt-3">
            Preview mode — full Strava sync goes live with our backend at launch.
          </p>

          {strava && (
            <div className="mt-8 space-y-4 fade-up">
              <p className="eyebrow">Recent runs (sample)</p>
              {sampleRuns.map((r) => (
                <div
                  key={r.name}
                  className="clay-sm p-5 flex flex-wrap items-baseline justify-between gap-3"
                >
                  <div>
                    <p className="text-sm">{r.name}</p>
                    <p className="text-xs text-muted mt-1">{r.date}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <span>{r.dist}</span>
                    <span className="text-muted">{r.pace}</span>
                    <span className="text-muted">{r.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
