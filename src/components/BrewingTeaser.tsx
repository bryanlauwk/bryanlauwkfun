import { Cat, MessageCircle } from "lucide-react";
import pawJackpotMacroTeaser from "@/assets/paw-jackpot-macro-teaser.webp";

// Work-in-progress teaser for the first physical object shaping the 2.0 direction.

export function BrewingTeaser() {
  return (
    <section
      id="physical-work"
      className="mt-16 md:mt-24 relative scroll-mt-24"
      aria-labelledby="brewing-heading"
    >
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Something domestic · in development</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Not house-trained yet
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card bg-grid-paper px-5 py-10 md:px-12 md:py-14 overflow-hidden">
        <Cat
          aria-hidden="true"
          strokeWidth={1.1}
          className="absolute right-3 top-4 h-28 w-28 rotate-[8deg] text-primary opacity-[0.07] md:right-8 md:top-6 md:h-44 md:w-44"
        />
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />

        <div className="relative z-10 grid gap-7 md:grid-cols-[1.35fr_0.65fr] md:gap-12 md:items-end">
          <div>
            <p className="exhibit-label text-primary mb-3">2.0 · around the house</p>
            <h2
              id="brewing-heading"
              className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-foreground"
            >
              Household tech. Cat logic.
            </h2>
            <div className="h-1 w-24 bg-primary mt-5" />
            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-5 max-w-3xl leading-relaxed">
              A familiar object is learning one strange trick. Built for paws, dressed for the
              living room, and not ready to explain itself yet.
            </p>
          </div>

          <div className="border-l-2 border-primary pl-4 md:pl-5">
            <p className="exhibit-label text-primary">Currently being domesticated</p>
            <p className="font-mono text-xs text-foreground/85 tracking-wider mt-2 leading-relaxed">
              The cat knows what it does. You can wait.
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
        </div>

        <figure className="product-lineup relative z-10 mt-9 md:mt-12">
          <div className="product-lineup-frame">
            <img
              src={pawJackpotMacroTeaser}
              alt="Five isolated macro details in powder blue, warm white, mocha, seafoam, and dusty rose hint at a tactile cat-facing object in development."
              width="1774"
              height="887"
              loading="lazy"
              decoding="async"
              className="product-lineup-image"
            />
          </div>
          <figcaption className="sr-only">
            Disconnected material, light, grip, edge, and cat-glyph details conceal the form of a
            work-in-progress physical play object for cats.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
