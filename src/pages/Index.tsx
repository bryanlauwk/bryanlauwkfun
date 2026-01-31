import { useState } from "react";
import { OctopusHero } from "@/components/OctopusHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { ImmersiveBackground } from "@/components/ImmersiveBackground";
import { CursorTrail } from "@/components/CursorTrail";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { ScrollSection } from "@/components/ScrollSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { usePublicProjects } from "@/hooks/useProjects";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Loader2, Sparkles } from "lucide-react";

const Index = () => {
  const { data: projects, isLoading } = usePublicProjects();
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [confettiPos, setConfettiPos] = useState<{ x: number; y: number } | null>(null);

  // Konami code easter egg
  useKonamiCode(() => {
    setKonamiActivated(true);
    setConfettiPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTimeout(() => setKonamiActivated(false), 5000);
  });

  const displayProjects = projects || [];
  const hasNoProjects = !isLoading && displayProjects.length === 0;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <CursorTrail />
      <ImmersiveBackground />
      <ScrollProgress />

      {/* Konami code secret message */}
      {konamiActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-8 shadow-2xl animate-fade-in">
            <p className="text-2xl font-display font-bold text-center flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              You found the secret!
              <Sparkles className="h-6 w-6 text-primary" />
            </p>
            <p className="text-muted-foreground text-center mt-2">
              You're clearly a person of culture.
            </p>
          </div>
        </div>
      )}

      {/* Confetti burst */}
      {confettiPos && (
        <ConfettiBurst
          x={confettiPos.x}
          y={confettiPos.y}
          onComplete={() => setConfettiPos(null)}
        />
      )}

      {/* Hero Section with Octopus Background */}
      <OctopusHero />

      {/* Intro Statement */}
      <ScrollSection 
        className="py-24 md:py-32 relative z-10"
        animation="fade-up"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            A creative space for{" "}
            <span className="text-primary font-semibold">experiments</span>,{" "}
            <span className="text-accent font-semibold">curiosities</span>, and{" "}
            <span className="text-foreground font-semibold">playful ideas</span>.
          </p>
        </div>
      </ScrollSection>

      {/* Projects Gallery */}
      <main className="container mx-auto px-4 py-8 pb-24 relative z-10">
        <ScrollSection animation="fade-up" className="mb-12">
          <h2 className="text-lg md:text-xl font-display text-muted-foreground text-center uppercase tracking-widest">
            Experiments
          </h2>
        </ScrollSection>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              Loading projects...
            </p>
          </div>
        ) : hasNoProjects ? (
          <ScrollSection animation="fade-scale" className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <div className="w-6 h-6 rounded-lg bg-primary/20" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                No projects yet
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                The playground is empty for now. Check back soon for experiments.
              </p>
            </div>
          </ScrollSection>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {displayProjects.map((project, index) => (
              <ScrollSection
                key={project.id}
                animation="fade-up"
                delay={index * 100}
                threshold={0.05}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description || undefined}
                  imageUrl={project.image_url || undefined}
                  href={project.href}
                  color={project.color}
                  isPlaceholder={false}
                  index={index}
                  showTextOverlay={project.show_text_overlay}
                />
              </ScrollSection>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
