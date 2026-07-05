import Avatar from "@/components/Avatar";

export const metadata = {
  title: "Testimonials | Praxis",
  description: "What runners say about Praxis shorts and tees.",
};

/* Sample testimonials — replace with real customer quotes as they come in. */
const testimonials = [
  {
    quote:
      "Wore the Tempo Shorts for my first half marathon in Ahmedabad heat. Forgot I had them on by kilometre two — which I now understand is the whole point.",
    name: "Rohan M.",
    detail: "Half marathoner · Ahmedabad",
    product: "Tempo Shorts",
  },
  {
    quote:
      "I've returned every pair of running shorts I bought online. These are the first ones that fit like the size chart said they would.",
    name: "Priya S.",
    detail: "Daily runner · Bengaluru",
    product: "Pace Shorts",
  },
  {
    quote:
      "The Stride Tee dried before my cooldown ended. In Mumbai humidity. I have no idea how and I don't need to know.",
    name: "Arjun K.",
    detail: "10K runner · Mumbai",
    product: "Stride Tee",
  },
  {
    quote:
      "Bought one pair to test, came back for three. The zip pocket actually fits a phone, which apparently is revolutionary.",
    name: "Sneha T.",
    detail: "Trail runner · Pune",
    product: "Split Shorts",
  },
  {
    quote:
      "Someone finally made running gear for Indian summers instead of European catalogues. The fabric is unreal at this price.",
    name: "Vikram D.",
    detail: "Marathon trainee · Delhi",
    product: "Long Run Tee",
  },
  {
    quote:
      "My club noticed the shorts before I said anything. Clean look, no logos screaming at you. Exactly my taste.",
    name: "Ananya R.",
    detail: "Running club captain · Ahmedabad",
    product: "Interval Shorts",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-16">
      <p className="eyebrow mb-2">From the road</p>
      <h1 className="font-serif text-3xl md:text-4xl">
        What runners say
      </h1>
      <p className="text-sm text-muted mt-3 max-w-md">
        Collected from our first customers — on WhatsApp, mid-cooldown, and
        occasionally mid-run.
      </p>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <figure key={t.name} className="clay p-7 flex flex-col">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="var(--ink)" strokeWidth="2" className="mb-4 opacity-40">
              <path d="M 2 18 Q 2 4 12 2 M 14 18 Q 14 4 24 2" />
            </svg>
            <blockquote className="text-sm leading-relaxed flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-line flex items-center gap-4">
              <Avatar variant={i} size={52} className="text-ink shrink-0" />
              <div>
                <p className="text-sm">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.detail}</p>
                <p className="eyebrow mt-1.5">{t.product}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="text-xs text-muted mt-10">
        Ran in Praxis? Send us your take on{" "}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          WhatsApp
        </a>{" "}
        and we'll feature it here.
      </p>
    </div>
  );
}
