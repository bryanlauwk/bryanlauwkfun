import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { MarkerUnderline } from "@/components/RedactionReveal";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait-photo.png";
import featuredArt from "@/assets/curiosity-concept-board-teaser.webp";

const Index = () => {
  useSEO({
    title: "Bryan LauWK — Interactive experiments to play with",
    description: "I build playful web experiments, odd ideas and interactive things for fun. Pick one and play — by Bryan LauWK.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-clip film-grain vignette">
      <CinematicHeader />
      <main id="main-content" className="flex-1 relative z-10">
        <section className="section-band-odd py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-12 grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <p className="exhibit-label mb-5">Bryan Lau · curious by default</p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight text-foreground">
                <span className="block">I build things</span>
                <span className="block">people want</span>
                <span className="block"><MarkerUnderline>to play with.</MarkerUnderline></span>
              </h1>
              <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed text-muted-foreground">
                Creativity is the interface. Growth is the outcome. Here’s one thing I built. Play with it.
              </p>
              <a href="#featured" className="mt-7 inline-flex min-h-12 items-center gap-4 border border-primary bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Play the latest <ArrowDown className="h-4 w-4" aria-hidden="true" />
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
        <section id="featured" className="section-band-even scroll-mt-36 md:scroll-mt-28 py-10 md:py-14" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div><p className="exhibit-label mb-3">Featured experiment · hit play</p><h2 id="featured-heading" className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">This one’s for the brave.</h2></div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">A tiny game. A very large durian.</span>
            </div>
            <a href="https://giant-food-run-kldex.bryanlauwaikit.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="group grid overflow-hidden border border-foreground/15 bg-card md:grid-cols-[1.15fr_1fr]">
              <div className="relative min-h-64 overflow-hidden bg-black md:min-h-[360px]">
                <img src={featuredArt} alt="Durian Dash KL concept artwork" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="eager" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-primary px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground"><Play className="h-3 w-3 fill-current" /> Play now</span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">KLDEX · browser game</p>
                <h3 className="mt-4 font-display text-3xl font-black uppercase leading-tight md:text-5xl">Durian Dash KL</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">Run through a durian-fuelled fever dream. Dodge the giants, grab the golden flesh, and see if you can make it to the finish.</p>
                <span className="mt-7 inline-flex min-h-11 w-fit items-center gap-3 border border-primary px-4 font-mono text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">Enter the dash <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          </div>
        </section>
        <section id="browser-work" className="section-band-odd scroll-mt-36 md:scroll-mt-28 py-10 md:py-14" aria-labelledby="browser-work-heading">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <div className="mb-7 md:mb-9">
              <p className="exhibit-label mb-3">The archive · made to be clicked</p>
              <h2 id="browser-work-heading" className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">More things to play with.</h2>
              <p className="mt-3 text-sm text-muted-foreground">Games, interactive experiments, and odd ideas. Choose one and see what happens.</p>
            </div>
            <ProjectGrid />
          </div>
        </section>
        <section id="about" className="section-band-even border-t border-foreground/10 py-10 md:py-14" aria-labelledby="about-heading">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-[0.7fr_1.3fr] md:px-12">
            <p className="exhibit-label">A little context</p>
            <div><h2 id="about-heading" className="font-display text-3xl font-black uppercase md:text-4xl">Curious by default. Shipping by habit.</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">I’m Bryan, a creative growth marketer who likes making useful things feel like play. This is my corner for odd ideas, quick prototypes, and interactive experiments. Some are polished; some are still figuring themselves out.</p><a href="#contact" className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline">Have an idea? Let’s talk <ArrowDown className="h-3.5 w-3.5 -rotate-90" /></a></div>
          </div>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
};
export default Index;
