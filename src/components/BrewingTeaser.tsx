const BOXES = [0, 1, 2];

// Room 02 — mystery teaser for the 2.0 direction (interactive installations).
// Deliberately discloses nothing: no names, no dates, no links.
export function BrewingTeaser() {
  return (
    <section className="mt-16 md:mt-24 relative" aria-labelledby="brewing-heading">
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Room 02 · Under construction</span>
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

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-12 place-items-center">
          {BOXES.map((i) => (
            <li key={i} className="neon-crate group" aria-hidden="true">
              <span className="neon-crate-top" />
              <span className="neon-crate-side" />
              <span className="neon-crate-face">
                <span className="stencil-glyph">?</span>
              </span>
            </li>
          ))}
        </ul>
        <span className="sr-only">Three sealed crates. Contents withheld.</span>

        <p className="exhibit-label mt-12 !tracking-[0.3em]">
          No launch date. No details. It'll be obvious when it lands.
        </p>
      </div>
    </section>
  );
}
