import { Github, Twitter, Linkedin } from "lucide-react";

export function CinematicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 py-16 md:py-24 px-4 md:px-12 border-t-2 border-foreground bg-background overflow-hidden">
      {/* dossier grid paper backdrop */}
      <div className="absolute inset-0 bg-grid-paper opacity-40 pointer-events-none" aria-hidden="true" />
      {/* black tape corners */}
      <span className="dossier-tape-black left-10 -top-2 rotate-[-4deg]" aria-hidden="true" />
      <span className="dossier-tape-black right-20 -top-2 rotate-[3deg]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        {/* dossier meta strip */}
        <div className="flex items-center justify-between mb-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>End of File — 001</span>
          <span className="hidden md:inline">Distribution: Anyone weird enough</span>
        </div>

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
                className="p-3 rounded-md border-2 border-foreground bg-card shadow-[3px_3px_0_hsl(var(--foreground))] hover:bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_hsl(var(--foreground))] transition-all duration-200"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-foreground" />
              </a>
            ))}
          </div>

          {/* red marker-tape motto */}
          <p className="dossier-tape text-xs md:text-sm">
            Good luck, have fun, don't die.
          </p>

          <p className="text-xs text-muted-foreground font-mono text-center uppercase tracking-[0.2em]">
            © {currentYear} bryanlauwk · Assembled somewhere in the daylight
          </p>
        </div>
      </div>
    </footer>
  );
}
