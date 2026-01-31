import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { Radio } from "lucide-react";
import { SoundToggle } from "./SoundToggle";

export function CinematicHeader() {
  const { count, isLoading } = useVisitorCounter();

  return (
    <header className="relative z-20 px-6 py-4 md:px-12 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-7 h-7 text-primary animate-electrical-flicker" />
            <div className="absolute inset-0 bg-primary/30 blur-md animate-glow-pulse" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-wider uppercase stranger-glow">
            Bryan Lau
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Sound toggle */}
          <SoundToggle />
          
          {/* Visitor counter - Hawkins Lab style */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
              Souls Lost
            </div>
            <div className="visitor-counter flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-christmas-light" />
              <span className="animate-electrical-flicker">
                {isLoading ? "------" : (count ?? 0).toString().padStart(6, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
