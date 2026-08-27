import { MessageCircle } from "lucide-react";
import conceptBoardTeaser from "@/assets/curiosity-concept-board-teaser.webp";

// Work-in-progress teaser for the six physical object studies shaping the 2.0 direction.

const DIRECTION_ROWS: [string, string][] = [
  ["Series", "BL-2.0 / object studies"],
  ["Directions", "06 / under wraps"],
  ["Interaction", "one obvious action"],
  ["Behaviour", "reacts with personality"],
  ["Payoff", "physical · surprising · filmable"],
];

export function BrewingTeaser() {
  return (
    <section
      id="physical-work"
      className="mt-16 md:mt-24 relative scroll-mt-24"
      aria-labelledby="brewing-heading"
    >
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Playable tech · in development</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Six directions
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card bg-grid-paper px-5 py-10 md:px-12 md:py-14 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />

        <div className="grid gap-7 md:grid-cols-[1.35fr_0.65fr] md:gap-12 md:items-end">
          <div>
            <p className="exhibit-label text-primary mb-3">2.0 · off the screen</p>
            <h2
              id="brewing-heading"
              className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-foreground"
            >
              Making curiosity playable.
            </h2>
            <div className="h-1 w-24 bg-primary mt-5" />
            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-5 max-w-3xl leading-relaxed">
              Familiar rituals, put somewhere they do not belong. One obvious action, a little
              personality, and a physical punchline made to work on camera.
            </p>
          </div>

          <div className="border-l-2 border-primary pl-4 md:pl-5">
            <p className="exhibit-label text-primary">First object series</p>
            <p className="font-mono text-xs text-foreground/85 tracking-wider mt-2 leading-relaxed">
              Six directions are being tested. The details stay hidden; the intent does not.
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

        <figure className="concept-board mt-9 md:mt-12">
          <div className="concept-board-header" aria-hidden="true">
            <span>Bryan Lau Create / Object Study 02</span>
            <span>Sheet 01 of 01</span>
          </div>

          <div className="concept-board-frame">
            <img
              src={conceptBoardTeaser}
              alt="An industrial design board with six deliberately obscured physical object studies."
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
              className="concept-board-image"
            />
            <div className="concept-board-screen" aria-hidden="true" />
            <div className="concept-board-seal" aria-hidden="true">
              <span>Concepts under wraps</span>
              <span>BL-2.0 / 06</span>
            </div>
          </div>

          <figcaption className="concept-board-caption">
            <span>Six familiar things. One shared piece of strange, playable technology.</span>
            <span>Individual designs deliberately obscured.</span>
          </figcaption>
        </figure>

        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12 mt-8 md:mt-10 items-start">
          <div className="border-t border-foreground/15 pt-5">
            <p className="exhibit-label text-primary">The 2.0 formula</p>
            <p className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mt-3 leading-tight">
              Familiar × Wrong × Playable × Reactive × Filmable
            </p>
            <p className="font-mono text-xs text-muted-foreground tracking-wider mt-3 max-w-xl leading-relaxed">
              Remix something people already understand. Misplace the payoff. Make the joke land
              through play—not explanation.
            </p>
          </div>

          <dl className="font-mono text-[0.65rem] md:text-xs border border-foreground/15 divide-y divide-foreground/10">
            {DIRECTION_ROWS.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                <dt className="uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
                <dd className="text-right text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6" aria-hidden="true">
          <div className="flex-1">
            <div className="barcode h-8 w-full max-w-xs" />
          </div>
          <p className="exhibit-label text-right !tracking-[0.3em] max-w-xs">
            Direction visible. Details sealed.
          </p>
        </div>
      </div>
    </section>
  );
}
