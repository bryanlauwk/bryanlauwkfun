import { HeroWorld } from "./HeroWorld";

/**
 * ArrivalSection — centred hero: a luminous orb rising above concentric
 * ripples, with the title stacked underneath.
 */
export function ArrivalSection() {
  return (
    <section
      id="arrival"
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-labelledby="arrival-heading"
    >
      <div className="absolute inset-0">
        <HeroWorld />
      </div>

      {/* centred orb + ripples */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[16%] flex justify-center md:top-[14%]"
      >
        <div className="relative h-[22rem] w-[22rem] md:h-[30rem] md:w-[30rem]">
          <span className="absolute left-1/2 top-[36%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_42%_36%,rgba(233,241,255,0.95),rgba(140,170,255,0.55)_38%,rgba(90,120,255,0.16)_62%,transparent_74%)] blur-[1px] md:h-56 md:w-56" />
          <span className="lp-pulse absolute left-1/2 top-[36%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.28),transparent_68%)] md:h-[26rem] md:w-[26rem]" />

          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 bottom-[16%] -translate-x-1/2 rounded-[50%] border border-[hsl(var(--lp-hair)/0.22)]"
              style={{
                width: `${28 + i * 22}%`,
                height: `${6 + i * 3}%`,
                opacity: 0.5 - i * 0.1,
                animation: `lp-float ${7 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,rgba(2,4,9,0)_0%,#020409_86%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-end px-6 pb-28 text-center md:justify-center md:pb-0 md:pt-24">
        <p className="lp-fade lp-label lp-label--violet" style={{ animationDelay: "120ms" }}>
          Season 00 · Prologue
        </p>

        <h1
          id="arrival-heading"
          className="lp-fade mt-6 text-[2.6rem] font-extralight leading-[1.08] tracking-[0.06em] text-foreground sm:text-6xl md:text-[4.25rem]"
          style={{ animationDelay: "240ms" }}
        >
          The Living Playground
        </h1>

        <p
          className="lp-fade mt-7 text-[0.66rem] uppercase tracking-[0.32em] text-foreground/80 md:text-xs"
          style={{ animationDelay: "340ms" }}
        >
          Interactive art × playful technology × AI experiences
        </p>

        <p
          className="lp-fade mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground"
          style={{ animationDelay: "420ms" }}
        >
          An evolving world by Bryan Lau. Everything here is playable, half-finished
          on purpose, and still growing.
        </p>

        <div className="lp-fade mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "520ms" }}>
          <a href="#now" className="lp-button">
            Enter the playground
          </a>
          <a href="#experiences" className="lp-button">
            Browse experiences
          </a>
        </div>
      </div>

      <a
        href="#now"
        className="lp-scroll-mark absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-[0.55rem] uppercase tracking-[0.34em] text-muted-foreground hover:text-foreground md:bottom-10"
      >
        <span className="mx-auto mb-2 block h-8 w-px bg-[hsl(var(--lp-hair)/0.35)]" aria-hidden="true" />
        Scroll to enter
      </a>
    </section>
  );
}
