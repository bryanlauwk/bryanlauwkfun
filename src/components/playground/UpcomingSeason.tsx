export function UpcomingSeason() {
  return (
    <section
      id="next"
      className="relative px-6 py-8 md:px-14 md:py-11"
      aria-labelledby="next-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="lp-panel lp-panel--quiet relative overflow-hidden px-6 py-6 md:px-10 md:py-7">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(139,108,255,0.14),transparent_62%)]"
          />
          <div className="relative grid gap-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-center md:gap-14">
            <p className="lp-label lp-label--violet">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
              Next transmission · forming
            </p>

            <h2
              id="next-heading"
              className="text-lg font-extralight leading-snug tracking-[0.02em] text-foreground md:text-xl"
            >
              Something is learning how to notice you.
            </h2>

            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Opens · Date unknown.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
