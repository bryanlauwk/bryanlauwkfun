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
          You found the door
        </p>

        <h1
          id="arrival-heading"
          className="lp-fade mt-8 font-tide text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl"
          style={{ animationDelay: "260ms" }}
        >
          A place that is
          <span className="lp-breathe italic text-accent"> still growing</span>,
          <br className="hidden sm:block" /> and knows you are here.
        </h1>

        <p
          className="lp-fade mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: "420ms" }}
        >
          Not a portfolio. A playground that changes with the seasons — small
          playable art, half-finished ideas, and things I had to make. Touch
          everything. Break something. Tell me what happened.
        </p>

        <div
          className="lp-fade mt-12 flex flex-col items-center gap-5"
          style={{ animationDelay: "580ms" }}
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
