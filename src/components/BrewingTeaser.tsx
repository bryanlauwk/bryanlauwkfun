import meltBanner from "@/assets/melt-banner.png.asset.json";

export function BrewingTeaser() {
  return (
    <section
      id="physical-work"
      className="relative scroll-mt-32 md:scroll-mt-24"
      aria-labelledby="physical-work-heading"
    >
      {/* Exhibit label row — mirrors the 1.0 section */}
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>2.0 · Off the screen</span>
        <span className="hidden md:inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Coming soon
        </span>
      </div>

      {/* Headline */}
      <div className="mb-8 md:mb-12">
        <h2
          id="physical-work-heading"
          className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground"
        >
          MELT. <span className="text-muted-foreground">Same brain. Different skins.</span>
        </h2>
        <div className="h-1 w-24 bg-primary mt-4" />
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4 max-w-2xl leading-relaxed">
          Play is leaving the screen. Interactive characters that notice, follow, and react —
          weird objects for a more interesting tomorrow.
        </p>
      </div>

      {/* Framed banner — dossier plate treatment */}
      <figure className="relative">
        <div className="paper-plate relative p-3 md:p-4 shadow-[0_24px_60px_hsl(240_5%_0%/0.7)] border border-foreground/10">
          <img
            src={meltBanner.url}
            alt="MELT, a curious interactive character platform that notices, follows, and reacts to people across cafés, retail, events, workspaces, and homes."
            width="1536"
            height="768"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          {/* Case strip — matches the hero portrait plate */}
          <div className="flex items-center justify-between mt-3 gap-3">
            <span className="exhibit-label !text-[8px] md:!text-[9px] text-muted-foreground">
              Specimen · M-01 · Record 2026
            </span>
            <span className="barcode h-3 w-16 inline-block" aria-hidden="true" />
          </div>
        </div>

        {/* Red evidence tape — top-left corner */}
        <div
          className="evidence-tape absolute -top-3 left-8 h-6 w-32 rotate-[-6deg] origin-center"
          aria-hidden="true"
        />

        {/* Classified stamp — bottom-right corner */}
        <span
          className="dossier-stamp absolute -bottom-4 right-4 md:right-8 rotate-[5deg] text-[10px] md:text-xs bg-background shadow-[0_8px_20px_hsl(0_0%_0%/0.4)] z-20"
          aria-hidden="true"
        >
          Classified · MELT
        </span>

        {/* Handwritten scribble */}
        <div
          className="handwritten absolute -top-6 right-6 md:right-16 rotate-[3deg] text-foreground/80 text-base md:text-lg leading-tight pointer-events-none z-20"
          aria-hidden="true"
        >
          it watches back ↗
        </div>
      </figure>
    </section>
  );
}
