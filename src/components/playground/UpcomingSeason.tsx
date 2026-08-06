export function UpcomingSeason() {
  return (
    <section
      id="next"
      className="relative px-6 py-16 md:px-14 md:py-20"
      aria-labelledby="next-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="lp-panel lp-panel--quiet relative overflow-hidden px-7 py-10 md:px-14 md:py-14">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(139,108,255,0.16),transparent_60%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14">
            <p className="lp-label lp-label--violet self-start">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
              Next transmission · forming
            </p>

            <div>
              <h2
                id="next-heading"
                className="text-2xl font-extralight leading-tight tracking-[0.02em] text-foreground md:text-[2.1rem]"
              >
                Something is learning how to notice you.
              </h2>

              <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
                It involves sound, a room that answers back, and at least one decision
                I&apos;ll regret. You&apos;ll know when it opens — the door here changes shape.
              </p>

              <dl className="mt-9 flex flex-wrap gap-x-14 gap-y-6">
                {[
                  { k: "Working title", v: "Room Tone" },
                  { k: "State", v: "Sketch → prototype" },
                  { k: "Opens", v: "Date unknown." },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {row.k}
                    </dt>
                    <dd className="mt-2 text-sm font-light text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <a href="#signal" className="lp-button mt-9">
                Get told when it opens
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
