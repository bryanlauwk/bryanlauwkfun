import { MessageCircle } from "lucide-react";

// Work-in-progress teaser for the 2.0 direction (physical playable technology).

const SPEC_ROWS: [string, string][] = [
  ["Case no.", "BL-2.0-001"],
  ["Object", "interactive toy for pets"],
  ["Mechanism", "play · feed · reward"],
  ["Purpose", "make feeding playable"],
  ["Handling", "paws encouraged"],
  ["Status", "prototype in development"],
];

export function BrewingTeaser() {
  return (
    <section id="physical-work" className="mt-16 md:mt-24 relative scroll-mt-24" aria-labelledby="brewing-heading">
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Under construction</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          In development
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card bg-grid-paper px-5 py-10 md:px-12 md:py-14 overflow-hidden">
        {/* Tape pinning the corners */}
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />

        {/* Stamp */}
        <span
          aria-hidden="true"
          className="dossier-stamp absolute top-6 right-6 md:top-8 md:right-10 rotate-[8deg] text-[0.6rem] md:text-xs"
        >
          Prototype 01
        </span>

        <h2
          id="brewing-heading"
          className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground"
        >
          2.0 — off the screen.
        </h2>
        <div className="h-1 w-24 bg-primary mt-4" />
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4 max-w-2xl">
          The experiments are escaping the browser. I’m developing physical toys, strange
          machines, and playable technology that can be touched, triggered, and lived with.
        </p>

        <div className="mt-7 max-w-2xl border-l-2 border-primary pl-4 md:pl-5">
          <p className="exhibit-label text-primary">First experiment · Play for pets</p>
          <p className="font-mono text-xs md:text-sm text-foreground/85 tracking-wider mt-2 leading-relaxed">
            The first experiment reimagines a food feeder as a playable machine for pets — part
            toy, part reward, part investigation into how animals play with technology.
          </p>
          <a
            href="https://wa.me/60149303546"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Discuss a strange idea
          </a>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-12 items-center mt-6">
          {/* The crate */}
          <div className="relative">
            <div className="crate-stage" aria-hidden="true">
              <span className="crate-shadow" />
              <div className="neon-crate">
                <span className="neon-crate-face crate-front">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-back">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-right">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-left">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-top">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-bottom" />
                <span className="crate-edges">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="handwritten absolute bottom-2 right-2 md:right-6 rotate-[-6deg] text-foreground/80 text-lg md:text-xl pointer-events-none"
            >
              don't ask
            </span>
          </div>

          {/* Spec sheet */}
          <dl className="font-mono text-[0.7rem] md:text-xs border border-foreground/15 divide-y divide-foreground/10">
            {SPEC_ROWS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                <dd className="text-right text-foreground">{v}</dd>
              </div>
            ))}
            <div className="px-3 py-3">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Status: in development
              </div>
              <div className="mt-2 h-1.5 w-full bg-foreground/10">
                <div className="h-full w-[62%] bg-primary" />
              </div>
            </div>
          </dl>
        </div>

        <span className="sr-only">One physical playable prototype in development.</span>

        {/* Barcode footer */}
        <div className="mt-10 flex items-end justify-between gap-6" aria-hidden="true">
          <div className="flex-1">
            <div className="barcode h-8 w-full max-w-xs" />
            <p className="exhibit-label mt-2">BL-2.0-001 · play for pets</p>
          </div>
          <p className="exhibit-label text-right !tracking-[0.3em] max-w-xs">
            Build notes released on X.
          </p>
        </div>
      </div>
    </section>
  );
}
