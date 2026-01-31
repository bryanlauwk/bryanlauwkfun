import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { UpsideDownParticles } from "@/components/UpsideDownParticles";
import { TypewriterMotto } from "@/components/TypewriterMotto";
import { StaticLoadingScreen } from "@/components/StaticLoadingScreen";
import { GuestBook } from "@/components/GuestBook";
import heroImage from "@/assets/dark-fantasy-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* TV Static loading screen */}
      <StaticLoadingScreen />

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
      <main className="flex-1 relative z-10 px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <section className="text-center mb-16 md:mb-24 animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-foreground">Something Strange</span>
              <span className="block animate-shimmer">Is Happening</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono mb-8">
              You've entered the void. These are the experiments, the games, 
              the things that crawled out of late nights and questionable decisions.
            </p>
            
            {/* Typewriter Motto */}
            <TypewriterMotto />
          </section>

          {/* Projects section */}
          <section>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider">
                Transmissions
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
