const TILES = [
  { no: "10", chip: "Installation" },
  { no: "11", chip: "Sensor" },
  { no: "12", chip: "Physical" },
];

// Room 03 — mystery teaser for the 2.0 direction (interactive installations).
// Deliberately discloses nothing: no names, no dates, no links.
export function BrewingTeaser() {
  return (
    <section className="mt-20 md:mt-32 relative" aria-labelledby="brewing-heading">
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Room 03 · Under construction</span>
        <span className="hidden md:inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Sealed
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card px-5 py-10 md:px-12 md:py-14 overflow-hidden">
        {/* Embargo tape across the corner */}
        <div
          className="evidence-tape absolute top-5 -right-12 h-6 w-52 rotate-[35deg] origin-center flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-background"
          aria-hidden="true"
        >
          Embargoed
        </div>

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

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-10">
          {TILES.map((tile) => (
            <li key={tile.no} className="group">
              <div className="paper-plate relative p-3 md:p-4 border border-foreground/10 shadow-[0_16px_40px_hsl(240_5%_0%/0.5)] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="exhibit-label !text-[8px] md:!text-[9px] text-[hsl(20_15%_20%)]">
                    No. {tile.no}
                  </span>
                  <span className="barcode h-3 w-12 inline-block" aria-hidden="true" />
                </div>

                {/* Fully redacted title */}
                <div className="h-7 md:h-8 w-full bg-[hsl(20_20%_12%)]" aria-hidden="true" />
                <span className="sr-only">Title withheld</span>

                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[hsl(20_20%_15%)]">
                    {tile.chip}
                  </span>
                  <span className="h-3 w-14 bg-[hsl(20_20%_12%)] inline-block" aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="exhibit-label mt-10 !tracking-[0.3em]">
          No launch date. No details. It'll be obvious when it lands.
        </p>
      </div>
    </section>
  );
}
