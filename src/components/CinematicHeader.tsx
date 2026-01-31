import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { Zap } from "lucide-react";

export function CinematicHeader() {
  const { count, isLoading } = useVisitorCounter();

  return (
    <header className="relative z-20 px-6 py-4 md:px-12 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap className="w-8 h-8 text-primary animate-glow-pulse" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-wide">
            Bryan Lau
          </span>
        </div>

        {/* Visitor counter */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm text-muted-foreground font-mono">
            Visitors
          </div>
          <div className="visitor-counter">
            {isLoading ? "------" : (count ?? 0).toString().padStart(6, "0")}
          </div>
        </div>
      </div>
    </header>
  );
}
