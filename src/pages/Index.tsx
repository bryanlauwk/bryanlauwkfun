import { useState } from "react";
import { RetroHeader } from "@/components/RetroHeader";
import { RetroFooter } from "@/components/RetroFooter";
import { ScatteredGallery } from "@/components/ScatteredGallery";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { CursorTrail } from "@/components/CursorTrail";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Sparkles, Star, Zap } from "lucide-react";

const Index = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [confettiPos, setConfettiPos] = useState<{ x: number; y: number } | null>(null);

  // Konami code easter egg
  useKonamiCode(() => {
    setKonamiActivated(true);
    setConfettiPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTimeout(() => setKonamiActivated(false), 5000);
  });

  return (
    <div className="min-h-screen flex flex-col bg-background pattern-checkerboard">
      {/* Cursor trail effect */}
      <CursorTrail />

      {/* Konami code secret */}
      {konamiActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-card border-4 border-primary p-8 shadow-[8px_8px_0_hsl(var(--foreground))] animate-fade-in">
            <p className="font-pixel text-2xl text-center text-foreground animate-rainbow">
              <Zap className="inline w-6 h-6 mr-2" />
              OMG U FOUND IT!!!
              <Zap className="inline w-6 h-6 ml-2" />
            </p>
            <p className="font-fun text-center mt-2 text-muted-foreground">
              You're clearly a person of culture. 🎮
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

      {/* Header */}
      <RetroHeader />

      {/* Main content area */}
      <main className="flex-1 relative px-4 py-8 overflow-visible">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 hidden lg:block">
          <Star className="w-16 h-16 text-accent opacity-50 animate-spin-slow" />
        </div>
        <div className="absolute top-20 right-20 hidden lg:block">
          <Sparkles className="w-12 h-12 text-secondary opacity-50 animate-bounce-chaotic" />
        </div>
        <div className="absolute bottom-20 left-20 hidden lg:block">
          <Zap className="w-14 h-14 text-primary opacity-50 animate-glitch" />
        </div>

        {/* Welcome message */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="font-pixel text-xl md:text-3xl text-foreground mb-2">
            <span className="animate-rainbow">✨ Welcome to my Projects! ✨</span>
          </h2>
          <p className="font-fun text-lg text-muted-foreground max-w-2xl mx-auto">
            Grab a card and drag it around! Click to visit the project.
            <br />
            <span className="text-sm italic">(yes, they're supposed to be scattered everywhere)</span>
          </p>
        </div>

        {/* Scattered gallery */}
        <ScatteredGallery />
      </main>

      {/* Footer */}
      <RetroFooter />
    </div>
  );
};

export default Index;
