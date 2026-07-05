export const metadata = {
  title: "Running Events | Praxis",
  description:
    "Upcoming running events across India — marathons, half marathons and 10Ks.",
};

/* Editable list — dates are indicative; confirm on each event's official
   site before publishing. Update this array as editions are announced. */
const events = [
  {
    name: "Satara Hill Half Marathon",
    city: "Satara, Maharashtra",
    when: "September 2026",
    month: "SEP",
    distances: "21.1K · 10K",
    note: "The famous hill half — cool weather, brutal climb, huge turnout.",
  },
  {
    name: "Vedanta Delhi Half Marathon",
    city: "New Delhi",
    when: "October 2026",
    month: "OCT",
    distances: "21.1K · 10K · Great Delhi Run",
    note: "India's biggest half marathon. Registrations fill fast.",
  },
  {
    name: "Adani Ahmedabad Marathon",
    city: "Ahmedabad",
    when: "November 2026",
    month: "NOV",
    distances: "42.2K · 21.1K · 10K · 5K",
    note: "Our home race. The Praxis crew runs this one together — come find us at the start line.",
    home: true,
  },
  {
    name: "Kolkata 25K",
    city: "Kolkata",
    when: "December 2026",
    month: "DEC",
    distances: "25K · 10K",
    note: "The only World Athletics Gold Label 25K — a distance you can't PB anywhere else.",
  },
  {
    name: "Tata Mumbai Marathon",
    city: "Mumbai",
    when: "January 2027",
    month: "JAN",
    distances: "42.2K · 21.1K · 10K",
    note: "The classic. Sea Link at sunrise is worth the 3 AM alarm.",
  },
  {
    name: "TCS World 10K",
    city: "Bengaluru",
    when: "April 2027",
    month: "APR",
    distances: "10K · 5K",
    note: "Fast, flat and festive — India's premier 10K.",
  },
];

function DetailsLink({ e, light }) {
  return (
    <a
      href={`https://www.google.com/search?q=${encodeURIComponent(e.name + " registration")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${light ? "btn-outline !border-paper !text-paper hover:!bg-paper hover:!text-ink" : "btn-outline"} !px-6 !py-2.5 whitespace-nowrap`}
    >
      Details
    </a>
  );
}

export default function EventsPage() {
  const home = events.find((e) => e.home);
  const rest = events.filter((e) => !e.home);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 md:pt-16">
      <p className="eyebrow mb-2">Lace up</p>
      <h1 className="font-serif text-3xl md:text-4xl">Upcoming events</h1>
      <p className="text-sm text-muted mt-3 max-w-md">
        The Indian running calendar, curated. Dates are indicative — always
        confirm on the official event page before you register.
      </p>

      {/* Home race — full-width, inverted */}
      <div className="mt-12 bg-ink text-paper rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <svg
          viewBox="0 0 600 200"
          className="absolute right-0 bottom-0 w-72 opacity-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M 40 180 L 560 180 M 120 180 L 120 100 L 200 100 L 200 180 M 240 180 L 240 60 L 340 60 L 340 180 M 380 180 L 380 110 L 460 110 L 460 180" />
        </svg>
        <p className="eyebrow !text-paper/60">Home race · {home.when}</p>
        <h2 className="font-serif text-3xl md:text-5xl mt-3">{home.name}</h2>
        <p className="text-sm mt-2 opacity-70">
          {home.city} · {home.distances}
        </p>
        <p className="text-sm mt-4 max-w-md opacity-80">{home.note}</p>
        <div className="mt-7">
          <DetailsLink e={home} light />
        </div>
      </div>

      {/* The rest — alternating layouts */}
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {rest.map((e, i) => {
          const variant = i % 3;
          if (variant === 0) {
            // big month numeral card
            return (
              <div key={e.name} className="clay p-7 flex gap-6 items-start">
                <p className="font-serif text-5xl leading-none mt-1">{e.month}</p>
                <div className="flex-1">
                  <h2 className="text-lg leading-snug">{e.name}</h2>
                  <p className="text-xs text-muted mt-1">
                    {e.city} · {e.distances}
                  </p>
                  <p className="text-sm text-muted mt-3">{e.note}</p>
                  <div className="mt-5">
                    <DetailsLink e={e} />
                  </div>
                </div>
              </div>
            );
          }
          if (variant === 1) {
            // outlined, centred card
            return (
              <div
                key={e.name}
                className="border border-line rounded-3xl p-7 text-center flex flex-col items-center justify-center"
              >
                <p className="eyebrow">{e.when}</p>
                <h2 className="font-serif text-2xl mt-2">{e.name}</h2>
                <p className="text-xs text-muted mt-2">
                  {e.city} · {e.distances}
                </p>
                <p className="text-sm text-muted mt-3 max-w-xs">{e.note}</p>
                <div className="mt-5">
                  <DetailsLink e={e} />
                </div>
              </div>
            );
          }
          // slim horizontal strip
          return (
            <div
              key={e.name}
              className="clay-sm p-6 md:col-span-2 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="md:w-40 shrink-0">
                <p className="font-serif text-xl">{e.when}</p>
              </div>
              <div className="flex-1">
                <h2 className="text-lg">{e.name}</h2>
                <p className="text-xs text-muted mt-1">
                  {e.city} · {e.distances} — {e.note}
                </p>
              </div>
              <DetailsLink e={e} />
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10">
        Racing one of these? Tag{" "}
        <a
          href="https://instagram.com/praxis.gear"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          @praxis.gear
        </a>{" "}
        and we'll cheer from the sidelines (or beside you).
      </p>
    </div>
  );
}
