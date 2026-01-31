import { Heart } from "lucide-react";

export function CinematicFooter() {
  return (
    <footer className="relative z-20 py-8 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Bryan Lau. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary animate-glow-pulse" /> and imagination
          </p>
        </div>
      </div>
    </footer>
  );
}
