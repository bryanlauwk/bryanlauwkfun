import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollSection } from "@/components/ScrollSection";
import { GuestBook } from "@/components/GuestBook";
import { StampBadge } from "@/components/StampBadge";
import { MarkerUnderline, RedactionReveal } from "@/components/RedactionReveal";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait.png";

const Index = () => {
  useSEO({
    title: "Bryan Lau — I build dumb ideas. They keep working.",
    description: "Bryan Lau builds dumb ideas that keep working. Some of them ship. Games, experiments and rabbit holes, late nights, shipped weekly.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero — MSCHF Structured Chaos dossier */}
          <section className="mb-16 md:mb-28 animate-fade-in-up relative">
            {/* paper + grid + tape */}
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl border-2 border-foreground/10 overflow-hidden" aria-hidden="true">
              <span className="dossier-tape-black left-6 -top-2 rotate-[-8deg]" />
              <span className="dossier-tape-black right-10 -top-2 rotate-[6deg]" />
            </div>

            {/* dossier header strip */}
            <div className="flex items-center justify-between mb-6 md:mb-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Dossier // Internal Distribution Only</span>
              <span className="hidden md:inline">File 001 — bryan.fun</span>
            </div>

            <div className="mb-4 md:mb-6 flex items-center gap-4 flex-wrap">
              <StampBadge label="Built to be screenshotted" />
              <span className="dossier-stamp" style={{ transform: "rotate(-4deg)" }}>Confidential</span>
            </div>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 items-center">
              {/* Headline — raw black Archivo on cream paper */}
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

              {/* Portrait — blends naturally into cream paper */}
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

            {/* MSCHF red marker-tape quote */}
            <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <p className="dossier-tape text-sm md:text-base max-w-2xl">
                In a crowded market, safe is invisible — and therefore the most dangerous thing a brand can do.
              </p>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
                — Gabe Whaley, MSCHF
              </span>
            </div>

            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase mt-6 md:mt-8">
              games · experiments · rabbit holes
            </p>
          </section>


          {/* Drops — dossier section */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-24 relative">
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl border-2 border-foreground/10 overflow-hidden" aria-hidden="true">
              <span className="dossier-tape-black left-10 -top-2 rotate-[-5deg]" />
              <span className="dossier-tape-black right-16 -top-2 rotate-[4deg]" />
            </div>

            <div className="flex items-center justify-between mb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Section 02 // Field Reports</span>
              <span className="hidden md:inline dossier-stamp text-[10px]" style={{ transform: "rotate(2deg)" }}>Evidence</span>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                Drops
              </h2>
              <div className="h-2 w-24 bg-primary mt-3 rounded-full" />
              <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4">
                shipped on a whim, kept because{" "}
                <RedactionReveal>they worked</RedactionReveal>.
              </p>
            </div>
            <ProjectGrid />
          </ScrollSection>

          {/* Guest Book — dossier section */}
          <ScrollSection animation="fade-up" className="mt-20 md:mt-32 relative">
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl border-2 border-foreground/10 overflow-hidden" aria-hidden="true">
              <span className="dossier-tape-black left-8 -top-2 rotate-[6deg]" />
              <span className="dossier-tape-black right-12 -top-2 rotate-[-4deg]" />
            </div>
            <div className="flex items-center justify-between mb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Section 03 // Incoming Transmissions</span>
              <span className="hidden md:inline dossier-stamp text-[10px]" style={{ transform: "rotate(-2deg)" }}>Log</span>
            </div>
            <GuestBook />
          </ScrollSection>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
};

export default Index;
