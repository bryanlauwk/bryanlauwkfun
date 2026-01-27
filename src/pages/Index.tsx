import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { DoodleBackground } from "@/components/DoodleBackground";
import { CursorTrail } from "@/components/CursorTrail";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { usePublicProjects } from "@/hooks/useProjects";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { data: projects, isLoading } = usePublicProjects();
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [confettiPos, setConfettiPos] = useState<{ x: number; y: number } | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  // Konami code easter egg
  useKonamiCode(() => {
    setKonamiActivated(true);
    setConfettiPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTimeout(() => setKonamiActivated(false), 5000);
  });

  // Staggered card entrance animation
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setCardsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const displayProjects = projects || [];
  const hasNoProjects = !isLoading && displayProjects.length === 0;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <CursorTrail />
      <DoodleBackground />
      <Header />

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

      {/* Main content */}
      <main className="container mx-auto px-4 py-4 pb-24 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              Loading projects...
            </p>
          </div>
        ) : hasNoProjects ? (
          /* Clean empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "transition-all duration-700 ease-out",
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
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
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
