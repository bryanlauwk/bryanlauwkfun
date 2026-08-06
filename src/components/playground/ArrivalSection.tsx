import { ArrowDown } from "lucide-react";

export function ArrivalSection() {
  return (
    <section
      id="arrival"
      className="relative flex min-h-[88vh] flex-col justify-center px-5 py-24 md:px-10 md:py-32"
      aria-labelledby="arrival-heading"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="lp-label lp-fade" style={{ animationDelay: "120ms" }}>
          Season 00 · Prologue
        </p>

        <h1
          id="arrival-heading"
          className="lp-fade mt-8 font-tide text-[2rem] leading-[1.06] tracking-[-0.02em] text-foreground [text-wrap:balance] sm:text-5xl md:text-7xl"
          style={{ animationDelay: "260ms" }}
        >
          THE LIVING{" "}
          <span className="lp-breathe italic text-accent">PLAYGROUND</span>
        </h1>

        <p
          className="lp-fade mt-7 font-tide text-xl italic text-foreground md:text-2xl"
          style={{ animationDelay: "380ms" }}
        >
          Welcome to this season.
        </p>

        <p className="lp-fade lp-label mt-4" style={{ animationDelay: "440ms" }}>
          An evolving world by Bryan Lau
        </p>

        <p
          className="lp-fade mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          style={{ animationDelay: "520ms" }}
        >
          A place that is still growing, and knows you are here. Small playable
          art, half-finished ideas, and things I had to make. Touch everything.
          Break something. Tell me what happened.
        </p>

        <div
          className="lp-fade mt-12 flex flex-col items-center gap-5"
          style={{ animationDelay: "620ms" }}
        >
          <a href="#now" className="lp-button">
            Step inside
          </a>
          <a
            href="#now"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1" />
            the season below is live
          </a>
        </div>
      </div>
    </section>
  );
}
