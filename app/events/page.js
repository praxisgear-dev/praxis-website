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
    distances: "21.1K · 10K",
    note: "The famous hill half — cool weather, brutal climb, huge turnout.",
  },
  {
    name: "Vedanta Delhi Half Marathon",
    city: "New Delhi",
    when: "October 2026",
    distances: "21.1K · 10K · Great Delhi Run",
    note: "India's biggest half marathon. Registrations fill fast.",
  },
  {
    name: "Adani Ahmedabad Marathon",
    city: "Ahmedabad",
    when: "November 2026",
    distances: "42.2K · 21.1K · 10K · 5K",
    note: "Our home race. The Praxis crew runs this one together.",
    home: true,
  },
  {
    name: "Kolkata 25K",
    city: "Kolkata",
    when: "December 2026",
    distances: "25K · 10K",
    note: "The only World Athletics Gold Label 25K — a distance you can't PB anywhere else.",
  },
  {
    name: "Tata Mumbai Marathon",
    city: "Mumbai",
    when: "January 2027",
    distances: "42.2K · 21.1K · 10K",
    note: "The classic. Sea Link at sunrise is worth the 3 AM alarm.",
  },
  {
    name: "TCS World 10K",
    city: "Bengaluru",
    when: "April 2027",
    distances: "10K · 5K",
    note: "Fast, flat and festive — India's premier 10K.",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-10 md:pt-16">
      <p className="eyebrow mb-2">Lace up</p>
      <h1 className="font-serif text-3xl md:text-4xl">Upcoming events</h1>
      <p className="text-sm text-muted mt-3 max-w-md">
        The Indian running calendar, curated. Dates are indicative — always
        confirm on the official event page before you register.
      </p>

      <div className="mt-12 space-y-5">
        {events.map((e) => (
          <div
            key={e.name}
            className={`clay p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${
              e.home ? "border border-ink" : ""
            }`}
          >
            <div className="md:w-36 shrink-0">
              <p className="font-serif text-xl leading-tight">{e.when}</p>
              {e.home && <p className="eyebrow mt-1">Home race</p>}
            </div>
            <div className="flex-1">
              <h2 className="text-lg">{e.name}</h2>
              <p className="text-xs text-muted mt-1">
                {e.city} · {e.distances}
              </p>
              <p className="text-sm text-muted mt-3">{e.note}</p>
            </div>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                e.name + " registration"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline self-start md:self-center whitespace-nowrap !px-6 !py-2.5"
            >
              Details
            </a>
          </div>
        ))}
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
