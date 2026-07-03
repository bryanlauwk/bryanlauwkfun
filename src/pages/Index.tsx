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
    <div className="min-h-screen flex flex-col bg-background relative">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <section className="mb-16 md:mb-28 animate-fade-in-up relative">
            {/* paper + grid + tape */}
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl border-2 border-foreground/10 overflow-hidden" aria-hidden="true">
              <span className="dossier-tape-black left-6 -top-2 rotate-[-8deg]" />
              <span className="dossier-tape-black right-10 -top-2 rotate-[6deg]" />
            </div>

            {/* header strip */}
            <div className="flex items-center justify-between mb-6 md:mb-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Field Notes · Ongoing</span>
              <span className="hidden md:inline">Studio Log — bryan.fun</span>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="inline-block font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] px-2 py-1 border border-foreground/40 text-foreground">
                In Progress
              </span>
            </div>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 items-center">
              <div className="relative">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight text-foreground">
                  <span className="block">I build</span>
                  <span className="block">dumb ideas.</span>
                  <span className="block">They keep</span>
                  <span className="block">
                    <MarkerUnderline>working.</MarkerUnderline>
                  </span>
                </h1>
              </div>

              <div className="relative flex justify-center md:justify-end">
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-40"
                  style={{ background: "radial-gradient(circle at 50% 45%, hsl(75 100% 59% / 0.55), transparent 60%)" }}
                  aria-hidden="true"
                />
                <img
                  src={heroPortrait}
                  alt="Bryan Lau portrait illustration"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mix-blend-multiply drop-shadow-[6px_8px_0_hsl(var(--foreground)/0.08)]"
                  loading="eager"
                  style={{ filter: "contrast(1.02)" }}
                />
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase mt-8 md:mt-10">
              playable art · small experiments · things I had to make
            </p>
          </section>


          {/* Drops */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-24 relative">
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl border-2 border-foreground/10 overflow-hidden" aria-hidden="true">
              <span className="dossier-tape-black left-10 -top-2 rotate-[-5deg]" />
              <span className="dossier-tape-black right-16 -top-2 rotate-[4deg]" />
            </div>

            <div className="flex items-center justify-between mb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Now Playing</span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live
              </span>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                Drops
              </h2>
              <div className="h-2 w-24 bg-primary mt-3 rounded-full" />
              <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4">
                Small playable things. Click one. Break it.{" "}
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
