export const metadata = {
  title: "Shipping, Returns & Exchange | Praxis",
  description:
    "Praxis shipping and returns — free shipping above ₹1,499, 4-7 day delivery across India, 7-day returns, 14-day size exchanges.",
};

const sections = [
  {
    title: "Shipping",
    body: "Free shipping on orders above ₹1,499. Orders below that ship at a flat ₹99 anywhere in India.",
  },
  {
    title: "Delivery",
    body: "4–7 working days across India. You'll get tracking on WhatsApp and email as soon as your order ships.",
  },
  {
    title: "Returns",
    body: "7 days from delivery. Items must be unused and unwashed with tags on. Refunds go back to your original payment method within 5–7 working days of us receiving the item.",
  },
  {
    title: "Size Exchanges",
    body: "Wrong size? Exchange within 14 days of delivery, free of charge. Check the size guide before ordering — and if you're between sizes on shorts, size up.",
  },
  {
    title: "How to initiate",
    body: "Message us on WhatsApp or email us — no forms, no portals. We're a small team and we handle every request personally.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 md:pt-16">
      <h1 className="font-serif text-3xl md:text-4xl">
        Shipping, Returns &amp; Exchange
      </h1>
      <p className="text-sm text-muted mt-3">
        Simple and transparent. Read this before you buy — it's short.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title} className="border-t border-line pt-6">
            <h2 className="font-serif text-xl mb-2">{s.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-surface">
        <p className="text-sm">
          Questions?{" "}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            WhatsApp us
          </a>{" "}
          or write to{" "}
          <a
            href="mailto:hello@praxis.gear"
            className="underline underline-offset-2"
          >
            hello@praxis.gear
          </a>
          .
        </p>
      </div>
    </div>
  );
}
