import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { UpsideDownParticles } from "@/components/UpsideDownParticles";
import { TypewriterMotto } from "@/components/TypewriterMotto";

import { GuestBook } from "@/components/GuestBook";
import heroImage from "@/assets/dark-fantasy-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">

      {/* Hero background */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        {/* Film grain overlay */}
        <div className="absolute inset-0 film-grain" />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
        {/* Fog layer at bottom */}
        <div className="fog-layer" />
      </div>

      {/* Lightning flash effect */}
      <div className="fixed inset-0 z-0 bg-accent/5 animate-lightning pointer-events-none" />

      {/* Upside Down floating particles */}
      <UpsideDownParticles />

      {/* Header */}
      <CinematicHeader />

      {/* Main content */}
      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <section className="text-center mb-12 md:mb-24 animate-fade-in-up">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 leading-tight">
              <span className="block text-foreground">Late Nights,</span>
              <span className="block animate-shimmer">Wild Ideas</span>
            </h1>
            
            {/* Improved subtitle with better visual hierarchy */}
            <div className="max-w-xl mx-auto mb-6 md:mb-8">
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-mono px-4 py-3 bg-background/60 backdrop-blur-sm rounded-sm border border-border/20">
                Experiments, games, and things that crawled out of late nights.
              </p>
            </div>
            
            {/* Typewriter Motto */}
            <TypewriterMotto />
          </section>

          {/* Projects section */}
          <section>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider">
                Drops
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            
            <ProjectGrid />
          </section>

          {/* Guest Book section */}
          <GuestBook />
        </div>
      </main>

      {/* Footer */}
      <CinematicFooter />
    </div>
  );
};

export default Index;
