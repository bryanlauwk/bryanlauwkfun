import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollSection } from "@/components/ScrollSection";
import { BrewingTeaser } from "@/components/BrewingTeaser";
import { MarkerUnderline, RedactionReveal } from "@/components/RedactionReveal";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait-photo.png";

const Index = () => {
  useSEO({
    title: "Bryan Lau Create — For the curious",
    description: "Browser experiments by Bryan Lau Create — playable games, simulations, charts and small interactive art for the curious. A stranger kind of internet.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-clip film-grain vignette">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <section className="mb-20 md:mb-32 animate-fade-in-up relative">
            <div className="flex items-center justify-end mb-8 md:mb-12 exhibit-label">
              <span className="hidden md:inline">1.3521°N 103.8198°E</span>
            </div>


            <div className="mb-6 md:mb-8">
              <span className="dossier-stamp text-xs md:text-sm rotate-[-2deg]">
                Now showing
              </span>
            </div>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-12 items-center">
              <div className="relative">
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.92] tracking-tight text-foreground">
                  <span className="block">For the curious.</span>
                  <span className="block">A stranger</span>
                  <span className="block">kind of</span>
                  <span className="block">
                    <MarkerUnderline>internet.</MarkerUnderline>
                  </span>
                </h1>
                <p className="exhibit-label mt-8 md:mt-10 !tracking-[0.3em]">
                  playable art · small experiments · things I had to make
                </p>
              </div>

              {/* The artist — investigative exposé collage */}
              <div className="relative flex justify-center md:justify-end">
                <figure className="relative w-[280px] md:w-[340px] lg:w-[380px] rotate-[-2deg]">
                  {/* Paper backing plate */}
                  <div className="paper-plate relative p-3 md:p-4 shadow-[0_24px_60px_hsl(240_5%_0%/0.7)] border border-foreground/10">
                    {/* Photo fragment — torn edge, halftone, grayscale */}
                    <div className="relative torn-edge overflow-hidden">
                      <img
                        src={heroPortrait}
                        alt="Bryan Lau Create portrait — evidence exhibit A"
                        className="w-full h-auto object-cover grayscale contrast-125 brightness-95"
                        loading="eager"
                      />
                      <div className="halftone-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
                      {/* Redaction bar across collar */}
                      <div
                        className="absolute left-[10%] right-[10%] top-[74%] h-4 md:h-5 bg-foreground"
                        aria-hidden="true"
                      />
                      {/* Fingerprint mark */}
                      <svg
                        className="absolute bottom-2 right-2 w-10 h-10 opacity-70"
                        viewBox="0 0 40 40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <ellipse cx="20" cy="22" rx="12" ry="15" />
                        <ellipse cx="20" cy="22" rx="9" ry="11.5" />
                        <ellipse cx="20" cy="22" rx="6" ry="8" />
                        <ellipse cx="20" cy="22" rx="3" ry="4.5" />
                        <path d="M8 18 Q10 8 20 6 Q30 8 32 18" />
                        <path d="M9 26 Q12 34 20 36 Q28 34 31 26" />
                      </svg>
                    </div>

                    {/* Case number strip */}
                    <div className="flex items-center justify-between mt-3 gap-3">
                      <span className="exhibit-label !text-[8px] md:!text-[9px] text-[hsl(20_15%_20%)]">
                        No. 01 · Fig. A · Lau, B.
                      </span>
                      <span className="barcode h-3 w-16 inline-block" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Red evidence tape — diagonal top-left */}
                  <div
                    className="evidence-tape absolute -top-3 -left-6 h-6 w-32 rotate-[-28deg] origin-center"
                    aria-hidden="true"
                  />
                  {/* Red evidence tape — diagonal bottom-right */}
                  <div
                    className="evidence-tape absolute -bottom-2 -right-4 h-5 w-24 rotate-[18deg] origin-center opacity-90"
                    aria-hidden="true"
                  />

                  {/* Evidence tag with punched hole */}
                  <div
                    className="absolute -bottom-8 -left-6 md:-left-10 w-32 md:w-36 rotate-[-8deg] px-3 py-2 pl-6 border border-foreground/20 shadow-[0_10px_24px_hsl(240_5%_0%/0.6)]"
                    style={{
                      background: "hsl(38 30% 78%)",
                      color: "hsl(20 20% 15%)",
                    }}
                  >
                    <span
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-background border border-foreground/40"
                      aria-hidden="true"
                    />
                    <div className="font-mono text-[9px] leading-tight uppercase tracking-[0.18em]">
                      Exhibit · A
                    </div>
                    <div className="font-mono text-[9px] leading-tight tracking-wider mt-0.5">
                      Subject: Lau, B.
                    </div>
                    <div className="font-mono text-[10px] leading-tight mt-0.5 text-[hsl(4_70%_35%)]">
                      侦查中
                    </div>
                  </div>

                  {/* Handwritten scribble */}
                  <div
                    className="handwritten absolute -top-10 right-2 md:right-4 rotate-[6deg] text-foreground/85 text-lg md:text-xl leading-tight max-w-[180px] text-right pointer-events-none"
                    aria-hidden="true"
                  >
                    do not trust with a keyboard →
                  </div>

                  {/* Certified curious stamp — kept, restyled corner */}
                  <span
                    className="dossier-stamp absolute -bottom-10 right-4 rotate-[10deg] text-[10px] md:text-xs bg-background/95"
                    aria-hidden="true"
                  >
                    Certified curious
                  </span>
                </figure>
              </div>
            </div>
          </section>

          {/* 2.0 teaser */}
          <ScrollSection animation="fade-up">
            <BrewingTeaser />
          </ScrollSection>

          {/* Browser experiments */}
          <ScrollSection animation="fade-up" className="mt-20 md:mt-32 relative">
            <div className="flex items-center justify-between mb-4 exhibit-label">
              <span>1.0 · In the browser</span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live
              </span>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                1.0 — Browser Experiments
              </h2>
              <div className="h-1 w-24 bg-primary mt-4" />
              <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4">
                Games, simulations, charts, and small toys you can play with right here. Please
                touch the art. Break it. <RedactionReveal>Tell me what happened</RedactionReveal>.
              </p>
            </div>
            <ProjectGrid />
          </ScrollSection>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
};

export default Index;
