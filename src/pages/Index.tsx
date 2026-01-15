import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { DoodleBackground } from "@/components/DoodleBackground";
import { CursorTrail } from "@/components/CursorTrail";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { usePublicProjects } from "@/hooks/useProjects";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const placeholderProjects = [
  { id: "placeholder-1", title: "Mystery Project", description: "Something chaotic this way comes...", href: "#", color: "bg-gradient-to-br from-pink-400 to-rose-500", image_url: null },
  { id: "placeholder-2", title: "Secret Experiment", description: "Currently being debugged from existence", href: "#", color: "bg-gradient-to-br from-violet-400 to-purple-500", image_url: null },
  { id: "placeholder-3", title: "Work in Progress", description: "41% done (we rounded up)", href: "#", color: "bg-gradient-to-br from-blue-400 to-cyan-500", image_url: null },
  { id: "placeholder-4", title: "Coming Soon™", description: "Ask again later", href: "#", color: "bg-gradient-to-br from-emerald-400 to-teal-500", image_url: null },
  { id: "placeholder-5", title: "Untitled Project", description: "Probably shipping soon (probably)", href: "#", color: "bg-gradient-to-br from-amber-400 to-orange-500", image_url: null },
  { id: "placeholder-6", title: "Top Secret", description: "Loading... forever", href: "#", color: "bg-gradient-to-br from-red-400 to-pink-500", image_url: null },
  { id: "placeholder-7", title: "Hidden Gem", description: "Under construction 🚧", href: "#", color: "bg-gradient-to-br from-indigo-400 to-blue-500", image_url: null },
  { id: "placeholder-8", title: "The Next Thing", description: "Coffee required to unlock", href: "#", color: "bg-gradient-to-br from-fuchsia-400 to-pink-500", image_url: null },
  { id: "placeholder-9", title: "???", description: "Top secret experiments", href: "#", color: "bg-gradient-to-br from-lime-400 to-green-500", image_url: null },
];

const MIN_CARDS = 9;

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

  const realProjects = projects || [];
  const placeholdersNeeded = Math.max(0, MIN_CARDS - realProjects.length);
  const displayProjects = [
    ...realProjects.map((p) => ({ ...p, isPlaceholder: false })),
    ...placeholderProjects.slice(0, placeholdersNeeded).map((p) => ({ ...p, isPlaceholder: true })),
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <CursorTrail />
      <DoodleBackground />
      <Header />

      {/* Konami code secret message */}
      {konamiActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl animate-bounce">
            <p className="text-2xl font-display font-bold text-center">
              🎮 You found the secret! 🎮
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
      <main className="container mx-auto px-4 py-8 pb-24 relative z-10">
        <div className="text-center mb-10" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm animate-pulse">
              Loading awesome stuff...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "transition-all duration-500",
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: `${index * 75}ms`,
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description || undefined}
                  imageUrl={project.image_url || undefined}
                  href={project.href}
                  color={project.color}
                  isPlaceholder={project.isPlaceholder}
                  index={index}
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
