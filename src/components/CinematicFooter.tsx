import { Github, Twitter, Linkedin } from "lucide-react";

export function CinematicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 py-16 md:py-24 px-4 md:px-12 border-t-2 border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
              { href: "https://twitter.com/bryanlauwk", Icon: Twitter, label: "Twitter" },
              { href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border-2 border-foreground bg-card hover:bg-primary hover:-translate-y-1 transition-all duration-200"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-foreground" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono uppercase tracking-[0.3em] text-xs font-medium">
              Don't die out there
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>

          <p className="text-xs text-foreground/50 font-mono text-center">
            © {currentYear} bryanlauwk · Made somewhere in the daylight
          </p>
        </div>
      </div>
    </footer>
  );
}
