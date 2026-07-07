import { Github, Twitter, Linkedin } from "lucide-react";

export function CinematicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 py-16 md:py-24 px-4 md:px-12 border-t border-foreground/15 overflow-hidden">
      <div className="signal-hairline absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-12 exhibit-label">
          <span>Exhibition · {currentYear}</span>
          <span className="hidden md:flex items-center gap-3">
            <span className="barcode h-4 w-20 inline-block" aria-hidden="true" />
            <span>End of tour</span>
          </span>
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
                className="p-3 border border-foreground/20 text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs md:text-sm text-primary uppercase tracking-[0.3em] text-center">
            Good luck, have fun, don't die.
          </p>

          <p className="exhibit-label text-center">
            © {currentYear} bryanlauwk · you were here
          </p>
        </div>
      </div>
    </footer>
  );
}
