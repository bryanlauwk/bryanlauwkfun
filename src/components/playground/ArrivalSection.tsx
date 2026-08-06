import { HeroWorld } from "./HeroWorld";

export function ArrivalSection() {
  return (
    <section
      id="arrival"
      className="relative min-h-[100svh] w-full overflow-hidden md:min-h-[105vh]"
      aria-labelledby="arrival-heading"
    >
      {/* original luminous particle environment */}
      <div className="absolute inset-0">
        <HeroWorld />
      </div>

      {/* readability gradient — soft, not an opaque box */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,9,0)_28%,rgba(2,4,9,0.86)_52%,#020409_78%)] md:bg-[linear-gradient(90deg,#020409_0%,rgba(2,4,9,0.92)_22%,rgba(2,4,9,0.55)_46%,rgba(2,4,9,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,rgba(2,4,9,0)_0%,#020409_88%)]"
      />


      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[110rem] items-end px-6 pb-40 pt-32 md:min-h-[105vh] md:items-center md:px-14 md:pb-56 md:pt-0">
        <div className="w-full md:w-[40%] md:pt-10">
          <p className="lp-fade lp-label lp-label--violet" style={{ animationDelay: "100ms" }}>
            Welcome
          </p>

          <h1
            id="arrival-heading"
            className="lp-fade mt-6 text-[2.4rem] font-extralight leading-[1.08] tracking-[0.05em] text-foreground sm:text-6xl md:text-[4rem] md:leading-[1.1]"
            style={{ animationDelay: "220ms" }}
          >
            The Living
            <br />
            Playground
          </h1>

          <p className="lp-fade lp-stack mt-8" style={{ animationDelay: "320ms" }}>
            Interactive experiences.
            <br />
            Collectible objects.
            <br />
            Digital worlds.
          </p>

          <p
            className="lp-fade mt-7 text-[0.62rem] uppercase tracking-[0.34em] text-accent"
            style={{ animationDelay: "400ms" }}
          >
            Built one season at a time.
          </p>

          <p
            className="lp-fade mt-5 max-w-xs text-xs font-light leading-relaxed text-muted-foreground/85"
            style={{ animationDelay: "460ms" }}
          >
            Season 00 · Prologue. An evolving world by Bryan Lau.
          </p>


          <div
            className="lp-fade mt-10 flex items-center gap-5"
            style={{ animationDelay: "540ms" }}
          >
            <span
              aria-hidden="true"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[hsl(var(--lp-hair)/0.3)]"
            >
              <span className="lp-pulse block h-5 w-5 rounded-full bg-[radial-gradient(circle_at_38%_32%,hsl(var(--accent)/0.75),transparent_70%)]" />
            </span>
            <span className="leading-relaxed">
              <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-foreground/85">
                Move to explore
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Everything reacts
              </span>
            </span>
          </div>


          <a
            href="#now"
            className="lp-button mt-10 hidden md:inline-flex"
          >
            Step inside
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
