// Mystery teaser for the 2.0 direction (interactive installations).
// Deliberately discloses nothing: no names, no dates, no links.
export function BrewingTeaser() {
  return (
    <section className="mt-16 md:mt-24 relative" aria-labelledby="brewing-heading">
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Under construction</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Embargoed
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card px-5 py-10 md:px-12 md:py-14">
        <h2
          id="brewing-heading"
          className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground"
        >
          2.0 — off the screen.
        </h2>
        <div className="h-1 w-24 bg-primary mt-4" />
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4 max-w-2xl">
          The next ones don't live in a browser tab. Interactive installations — fun, creative,
          playable tech you can walk into.
        </p>

        <div className="crate-stage mt-10" aria-hidden="true">
          <div className="neon-crate">
            <span className="neon-crate-face crate-front"><span className="stencil-glyph">?</span></span>
            <span className="neon-crate-face crate-back"><span className="stencil-glyph">?</span></span>
            <span className="neon-crate-face crate-right"><span className="stencil-glyph">?</span></span>
            <span className="neon-crate-face crate-left"><span className="stencil-glyph">?</span></span>
            <span className="neon-crate-face crate-top"><span className="stencil-glyph">?</span></span>
            <span className="neon-crate-face crate-bottom" />
          </div>
        </div>
        <span className="sr-only">One sealed crate. Contents withheld.</span>

        <p className="exhibit-label mt-10 text-center !tracking-[0.3em]">
          No launch date. No details. It'll be obvious when it lands.
        </p>
      </div>
    </section>
  );
}
