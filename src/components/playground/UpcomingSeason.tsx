export function UpcomingSeason() {
  return (
    <section
      id="next"
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="next-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="lp-panel lp-panel--quiet overflow-hidden p-8 md:p-14">
          <p className="lp-label">Next season · unfinished on purpose</p>

          <h2
            id="next-heading"
            className="mt-5 font-tide text-3xl italic leading-tight text-foreground md:text-5xl"
          >
            Something is growing where you can&apos;t see it yet
          </h2>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            The next thing is halfway built and behaving badly. It involves
            sound, a room that answers back, and at least one decision I&apos;ll
            regret. You&apos;ll know when it opens — the door here changes shape.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Working title", v: "Room Tone" },
              { k: "State", v: "Sketch → prototype" },
              { k: "Opens", v: "When it stops crashing" },
            ].map((row) => (
              <li key={row.k} className="lp-shard">
                <span className="lp-label">{row.k}</span>
                <span className="mt-2 block font-tide text-xl italic text-foreground">
                  {row.v}
                </span>
              </li>
            ))}
          </ul>

          <a href="#signal" className="lp-button lp-button--ghost mt-10">
            Get told when it opens
          </a>
        </div>
      </div>
    </section>
  );
}
