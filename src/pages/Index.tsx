import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollSection } from "@/components/ScrollSection";
import { GuestBook } from "@/components/GuestBook";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — Games, experiments and rabbit holes",
    description: "Drops from Bryan Lau: small games, web experiments and side projects made for fun. Late nights, wild ideas, shipped weekly.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <section className="mb-16 md:mb-28 animate-fade-in-up">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center">
              {/* Lime block headline */}
              <div className="bg-primary rounded-2xl p-8 md:p-12 lg:p-14 border-2 border-foreground shadow-[6px_6px_0_hsl(var(--foreground))]">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-primary-foreground">
                  <span className="block">I make</span>
                  <span className="block">things</span>
                  <span className="block italic">for fun.</span>
                </h1>
              </div>

              {/* Flat-line illustration */}
              <div className="flex justify-center md:justify-end">
                <svg
                  viewBox="0 0 240 240"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {/* Phone / browser frame */}
                  <rect x="40" y="30" width="120" height="170" rx="14" />
                  <line x1="40" y1="60" x2="160" y2="60" />
                  <circle cx="55" cy="45" r="3" fill="hsl(var(--foreground))" />
                  {/* Cursor arrow */}
                  <path d="M85 100 L85 150 L100 138 L110 160 L120 156 L110 134 L130 134 Z" fill="hsl(var(--primary))" />
                  {/* Sparkles */}
                  <path d="M180 70 L180 90 M170 80 L190 80" />
                  <path d="M195 130 L195 145 M188 137 L202 137" />
                  <path d="M55 175 L55 188 M48 181 L62 181" />
                </svg>
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase mt-8 md:mt-10">
              games · experiments · rabbit holes
            </p>
          </section>

          {/* Drops */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-24">
            <div className="mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                Drops
              </h2>
              <div className="h-2 w-24 bg-primary mt-3 rounded-full" />
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
