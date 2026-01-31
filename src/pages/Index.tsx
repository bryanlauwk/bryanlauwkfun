import { useState } from "react";
import { AbyssalCanvas } from "@/components/AbyssalCanvas";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Sparkles } from "lucide-react";

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
    <div className="h-screen w-screen overflow-hidden bg-background">
      {/* Konami code secret message */}
      {konamiActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="parchment-bg backdrop-blur-md border border-border rounded-lg p-8 shadow-2xl animate-fade-in">
            <p className="text-2xl font-display font-semibold text-center flex items-center gap-3 text-card-foreground">
              <Sparkles className="h-6 w-6 text-primary" />
              You found the secret!
              <Sparkles className="h-6 w-6 text-primary" />
            </p>
            <p className="text-card-foreground/70 text-center mt-2 font-body italic">
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

      {/* Full-screen abyssal canvas */}
      <AbyssalCanvas />
    </div>
  );
};

export default Index;
