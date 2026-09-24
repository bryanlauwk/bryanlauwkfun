import { ArrowDown } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { MarkerUnderline } from "@/components/RedactionReveal";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait-photo.png";

const Index = () => {
  useSEO({
    title: "Bryan LauWK — Playable experiments & interactive art",
    description: "Dumb ideas, taken seriously — good luck, have fun, don't die. Playable browser experiments by Bryan LauWK: games, charts and strange little machines.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-clip film-grain vignette">
      <CinematicHeader />
      <main id="main-content" className="flex-1 relative z-10">
        <section className="section-band-odd py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-12 grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <p className="exhibit-label mb-5">Bryan Lau · maker of questionable things</p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight text-foreground">
                <span className="block">Good luck</span>
                <span className="block">have fun</span>
                <span className="block"><MarkerUnderline>don’t die</MarkerUnderline></span>
              </h1>
              <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed text-muted-foreground">
                Dumb ideas, taken seriously. Games, experiments, and strange little machines. Go on. Touch something.
              </p>
              <a href="#browser-work" className="mt-7 inline-flex min-h-12 items-center gap-4 border border-primary bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Play something <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <figure className="relative mx-auto hidden w-full max-w-[290px] rotate-[3deg] md:block">
              <div className="paper-plate p-3 shadow-[0_16px_40px_hsl(240_5%_0%/0.4)] border border-foreground/10">
                <img src={heroPortrait} alt="Bryan Lau, maker of these experiments" className="w-full h-auto grayscale contrast-125 torn-edge" loading="eager" />
                <figcaption className="mt-3 font-mono text-[11px] text-[hsl(20_15%_20%)]">Exhibit A. Probably responsible.</figcaption>
              </div>
              <div className="evidence-tape absolute -top-3 left-8 h-6 w-28 rotate-[-12deg]" aria-hidden="true" />
              <span className="handwritten absolute -bottom-6 right-0 rotate-[-5deg] text-lg text-foreground" aria-hidden="true">do not trust with a keyboard ↗</span>
            </figure>
          </div>
        </section>
        <section id="browser-work" className="section-band-even scroll-mt-36 md:scroll-mt-28 py-10 md:py-14" aria-labelledby="browser-work-heading">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <div className="mb-7 md:mb-9">
              <p className="exhibit-label mb-3">The collection · please touch</p>
              <h2 id="browser-work-heading" className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">Pick your kind of weird.</h2>
              <p className="mt-3 text-sm text-muted-foreground">One click to the real thing. Projects open in a new tab so you can come back for more.</p>
            </div>
            <ProjectGrid />
          </div>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
};
export default Index;
