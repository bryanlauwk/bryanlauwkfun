import { Cat, MessageCircle } from "lucide-react";
import chaosMachinesLineup from "@/assets/chaos-machines-lineup.png";

const WAITLIST_URL =
  "https://wa.me/60149303546?text=" +
  encodeURIComponent("i want CAT Chaos, how much?");

// Privacy-safe teaser for the first interactive product family shaping the 2.0 direction.

export function BrewingTeaser() {
  return (
    <section
      id="physical-work"
      className="relative scroll-mt-32 md:scroll-mt-24"
      aria-labelledby="brewing-heading"
    >
      <div className="flex items-center justify-between mb-4 exhibit-label">
         <span>2.0 · PLAY STRANGE</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          In development
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

        <div className="relative z-10 max-w-4xl">
          <h2
            id="brewing-heading"
            className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-foreground"
          >
             CAT CHAOS
          </h2>
          <div className="h-1 w-24 bg-primary mt-5" />
          <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-5 max-w-3xl leading-relaxed">
             Three in a row. Treats on the house. Jackpot tastes better.
          </p>
        </div>

        <figure className="product-lineup relative z-10 mt-9 md:mt-12">
          <div className="product-lineup-frame">
            <img
              src={chaosMachinesLineup}
              alt="A lineup of five pastel slot-machine-style playable devices with lever handles and cat-symbol reels, in development."
              width="1774"
              height="887"
              loading="lazy"
              decoding="async"
              className="product-lineup-image"
            />
          </div>
          <figcaption className="sr-only">
            A lineup of five pastel machines with levers, symbol reels, and treat chutes — the first
            family of physical playable prototypes.
          </figcaption>
        </figure>

        <div className="relative z-10 mt-8 md:mt-10 flex flex-wrap items-center gap-4">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 border border-primary bg-primary px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            JOIN WAITLIST
          </a>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            {"\n"}
          </span>
        </div>
      </div>
    </section>
  );
}
