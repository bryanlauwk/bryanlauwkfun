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

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,rgba(2,4,9,0)_0%,#020409_86%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:pb-16 md:pt-32">
        {/* centred orb rising above concentric ripples */}
        <div
          aria-hidden="true"
          className="lp-fade relative mb-10 h-44 w-64 shrink-0 md:mb-14 md:h-60 md:w-96"
          style={{ animationDelay: "60ms" }}
        >
          <span className="absolute left-1/2 top-[26%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_42%_36%,rgba(238,244,255,0.98),rgba(146,176,255,0.6)_38%,rgba(88,118,255,0.18)_62%,transparent_76%)] md:h-40 md:w-40" />
          <span className="lp-pulse absolute left-1/2 top-[26%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.3),transparent_68%)] md:h-80 md:w-80" />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-[50%] border border-[hsl(var(--lp-hair)/0.24)]"
              style={{
                width: `${26 + i * 22}%`,
                height: `${10 + i * 7}%`,
                opacity: 0.55 - i * 0.11,
                animation: `lp-float ${7 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

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
