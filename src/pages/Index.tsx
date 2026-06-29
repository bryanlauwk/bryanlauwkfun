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
          {/* Hero */}
          <section className="mb-16 md:mb-28 animate-fade-in-up relative">
            <div className="absolute -inset-x-4 -top-6 -bottom-10 bg-grid-paper -z-10 rounded-2xl" aria-hidden="true" />

            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <StampBadge label="Built to be screenshotted" />
            </div>

            <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center">
              {/* Lime block headline */}
              <div className="bg-primary rounded-2xl p-8 md:p-12 lg:p-14 border-2 border-foreground shadow-[6px_6px_0_hsl(var(--foreground))]">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight text-primary-foreground">
                  <span className="block">I build dumb ideas.</span>
                  <span className="block">They keep working.</span>
                  <span className="block italic">Some of them ship.</span>
                </h1>
              </div>

              {/* Portrait illustration */}
              <div className="flex justify-center md:justify-end">
                <img
                  src={heroPortrait}
                  alt="Bryan Lau portrait illustration"
                  className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
                  loading="eager"
                />
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase mt-8 md:mt-10">
              <MarkerUnderline>games</MarkerUnderline> · experiments · rabbit holes
            </p>
          </section>

          {/* Drops */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-24">
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

          {/* Guest Book */}
          <ScrollSection animation="fade-up" className="mt-20 md:mt-32">
            <GuestBook />
          </ScrollSection>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
};

export default Index;
