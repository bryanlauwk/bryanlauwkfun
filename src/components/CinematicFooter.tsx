import { Skull, Github, Twitter, Linkedin } from "lucide-react";

export function CinematicFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-20 py-10 md:py-12 px-4 md:px-12 border-t border-border/30">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/bryanlauwk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-sm border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a 
              href="https://twitter.com/bryanlauwk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-sm border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 group"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a 
              href="https://linkedin.com/in/bryanlauwk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-sm border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
          
          {/* Motto */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Skull className="w-4 h-4 text-primary animate-electrical-flicker" />
            <span className="font-mono uppercase tracking-widest text-xs">
              Don't die out there
            </span>
            <Skull className="w-4 h-4 text-primary animate-electrical-flicker" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/70 font-mono text-center">
            © {currentYear} bryanlauwk · Made somewhere in the void
          </p>
        </div>
      </div>
      
      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
}
