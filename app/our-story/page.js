export const metadata = {
  title: "Our Story | Praxis",
  description:
    "How Praxis started — from fashion design training to Athlos Activewear to building running gear in Ahmedabad.",
};

export default function OurStoryPage() {
  return (
    <article>
      <div className="relative h-[60vh] min-h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/site/story.svg"
          alt="The founder of Praxis, mid-stride"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto max-w-6xl px-5 pb-12 w-full">
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 mt-16 text-[15px] leading-relaxed space-y-6">
        <p>
          I trained as a fashion designer. Then I spent two years at Athlos
          Activewear learning how this industry actually works — how fabric is
          sourced, how a seam fails, why most activewear in India is designed
          for a catalogue and not for a body in motion.
        </p>
        <p>
          Then I came home to Ahmedabad and started running. Early, before the
          heat. Ellis Bridge, the riverfront, the same loops every week. And I
          kept noticing the same thing: nothing I wore was made for this — not
          the humidity, not the distance, not the roads.
        </p>
        <p>
          So I built Praxis. The name means practice, action, doing. Not
          talking about the run. Doing the run.
        </p>
        <p>
          Everything we make gets tested on real training runs in real Indian
          conditions before it goes on this site. If it chafes at kilometre
          twenty, it doesn't ship. If it's still wet an hour after the run, it
          doesn't ship.
        </p>
        <p>
          This is for the people who are out there before sunrise — the
          Sunday-long-run people, the one-more-interval people. We're starting
          small: shorts and tees, done properly. Where it goes from here, we'll
          find out together.
        </p>
        <p className="font-serif text-xl pt-4">
          Clean. Technical. Honest.
        </p>
      </div>
    </article>
  );
}
