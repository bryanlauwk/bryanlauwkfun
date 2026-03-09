import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { UpsideDownParticles } from "@/components/UpsideDownParticles";
import { TypewriterMotto } from "@/components/TypewriterMotto";
import { CrypticWhisper } from "@/components/CrypticWhisper";
import { ScrollSection } from "@/components/ScrollSection";

import { GuestBook } from "@/components/GuestBook";
import { HeroAdPlaceholders } from "@/components/HeroAdPlaceholders";
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

      {/* Floating ad placeholders in the sky */}
      <HeroAdPlaceholders />

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
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight animate-breathe">
              <span className="block text-foreground">I make things</span>
              <span className="block animate-shimmer">for fun</span>
            </h1>
            
            <p className="font-mono text-sm md:text-base text-foreground/70 tracking-widest uppercase mb-8">
              games · experiments · rabbit holes
            </p>
            
            {/* Typewriter Motto */}
            <div className="mt-2">
              <TypewriterMotto />
            </div>
            <CrypticWhisper />
          </section>

          {/* Projects section */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-32">
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <div className="grunge-divider" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider">
                Drops
              </h2>
              <div className="grunge-divider" />
            </div>
            
            <ProjectGrid />
          </ScrollSection>

          {/* Guest Book section */}
          <ScrollSection animation="fade-up" className="mt-16 md:mt-32">
            <GuestBook />
          </ScrollSection>
        </div>
      </main>

      {/* Footer */}
      <CinematicFooter />
    </div>
  );
};

export default Index;
