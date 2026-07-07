import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollSection } from "@/components/ScrollSection";
import { MarkerUnderline, RedactionReveal } from "@/components/RedactionReveal";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait.png";

const Index = () => {
  useSEO({
    title: "Bryan Lau — Playable art & small experiments",
    description: "Bryan Lau makes playable art, small web experiments, and interactive things he had to build. Some of them work. Click one.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-clip film-grain vignette">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero — Room 01 */}
          <section className="mb-20 md:mb-32 animate-fade-in-up relative">
            <div className="flex items-center justify-between mb-8 md:mb-12 exhibit-label">
              <span>Room 01 · Permanent collection</span>
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
                  <span className="block">I build</span>
                  <span className="block">dumb ideas.</span>
                  <span className="block">They keep</span>
                  <span className="block">
                    <MarkerUnderline>working.</MarkerUnderline>
                  </span>
                </h1>
                <p className="exhibit-label mt-8 md:mt-10 !tracking-[0.3em]">
                  playable art · small experiments · things I had to make
                </p>
              </div>

              {/* The artist — framed print on a bone-white plate */}
              <div className="relative flex justify-center md:justify-end">
                <figure className="relative rotate-1">
                  <div className="border border-foreground/25 bg-[hsl(40_8%_92%)] p-3 md:p-4 shadow-[0_20px_60px_hsl(240_5%_0%/0.6)]">
                    <img
                      src={heroPortrait}
                      alt="Bryan Lau portrait illustration"
                      className="w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain mix-blend-multiply grayscale contrast-125"
                      loading="eager"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between mt-3 exhibit-label !text-[8px] md:!text-[9px]">
                    <span>Fig. 01 — The artist, mixed media</span>
                    <span className="barcode h-3 w-14 inline-block" aria-hidden="true" />
                  </figcaption>
                  <span
                    className="dossier-stamp absolute -top-3 -right-3 md:-right-6 rotate-[8deg] text-[10px] md:text-xs bg-background"
                    aria-hidden="true"
                  >
                    Certified dumb
                  </span>
                </figure>
              </div>
            </div>
          </section>

          {/* Drops — Room 02 */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-24 relative">
            <div className="flex items-center justify-between mb-4 exhibit-label">
              <span>Room 02 · Interactive works</span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live
              </span>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                Drops
              </h2>
              <div className="h-1 w-24 bg-primary mt-4" />
              <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4">
                Small playable things. Please touch the art. Break it.{" "}
                <RedactionReveal>Tell me what happened</RedactionReveal>.
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
