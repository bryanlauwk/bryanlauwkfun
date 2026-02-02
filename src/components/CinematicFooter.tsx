import { Skull } from "lucide-react";

export function CinematicFooter() {
  return (
    <footer className="relative z-20 py-8 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} bryanlauwk · Made somewhere in the void
          </p>

          {/* Motto reminder */}
          <p className="text-sm text-muted-foreground flex items-center gap-2 font-mono">
            <Skull className="w-4 h-4 text-primary animate-electrical-flicker" />
            <span className="uppercase tracking-wider text-xs">Don't die out there</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
