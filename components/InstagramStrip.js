export default function InstagramStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="flex items-baseline justify-between mb-6">
        <p className="eyebrow">@praxis.gear</p>
        <a
          href="https://instagram.com/praxis.gear"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-ink transition-colors"
        >
          Follow →
        </a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <a
            key={i}
            href="https://instagram.com/praxis.gear"
            target="_blank"
            rel="noopener noreferrer"
            className="clay-sm block aspect-square overflow-hidden p-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/site/ig-${i}.svg`}
              alt={`Praxis on Instagram, post ${i}`}
              className="artwork w-full h-full object-contain hover:opacity-75 transition-opacity"
            />
          </a>
        ))}
      </div>
      <p className="text-xs text-muted mt-3">
        Live feed connects at launch via the Instagram Basic Display API.
      </p>
    </section>
  );
}
