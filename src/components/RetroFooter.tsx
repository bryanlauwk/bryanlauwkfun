import { Heart, Star, Mail, ExternalLink } from "lucide-react";

const webRings = [
  { name: "Cool Sites Ring", symbol: "🌐" },
  { name: "Indie Web", symbol: "🏠" },
  { name: "Retro Revival", symbol: "📟" },
];

export function RetroFooter() {
  return (
    <footer className="mt-auto">
      {/* Construction tape */}
      <div className="h-4 construction-tape" />

      {/* Main footer */}
      <div className="bg-card border-t-4 border-border py-6 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Web ring section */}
          <div className="text-center mb-6">
            <p className="font-pixel text-sm text-muted-foreground mb-3">
              ◄◄ Member of these Web Rings ►►
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {webRings.map((ring) => (
                <span
                  key={ring.name}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-muted border-2 border-border font-fun text-sm"
                >
                  <span>{ring.symbol}</span>
                  {ring.name}
                </span>
              ))}
            </div>
          </div>

          {/* Badges section */}
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            <Badge>Made with HTML</Badge>
            <Badge>CSS 3.0</Badge>
            <Badge>JavaScript</Badge>
            <Badge>Best viewed in Chrome</Badge>
            <Badge>No AI was harmed</Badge>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 font-fun text-primary hover:text-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email me!
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-fun text-primary hover:text-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Guestbook
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center border-t-2 border-dashed border-border pt-4">
            <p className="font-fun text-sm text-muted-foreground">
              <Star className="inline w-4 h-4 text-accent mr-1" />
              © {new Date().getFullYear()} Bryan Lau • All rights reserved
              <Star className="inline w-4 h-4 text-accent ml-1" />
            </p>
            <p className="font-fun text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-secondary animate-bounce-chaotic" /> and too much caffeine
            </p>
          </div>

          {/* Retro "under construction" */}
          <div className="text-center mt-4">
            <span className="font-pixel text-xs text-muted-foreground animate-blink">
              🚧 This site is forever under construction 🚧
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-1 bg-muted border border-border font-pixel text-[10px] text-foreground">
      {children}
    </span>
  );
}
