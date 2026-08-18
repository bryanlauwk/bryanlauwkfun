import { ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";
import { BrandSignature } from "./BrandSignature";

export function CinematicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-20 py-16 md:py-24 px-4 md:px-12 border-t border-foreground/15 overflow-hidden scroll-mt-24">
      <div className="signal-hairline absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-12 exhibit-label">
          <span>Exhibition · {currentYear}</span>
          <span className="hidden md:flex items-center gap-3">
            <span className="barcode h-4 w-20 inline-block" aria-hidden="true" />
            <span>End of tour</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-7">
          <div className="max-w-2xl text-center">
            <p className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              Something strange should exist.
            </p>
            <p className="mt-4 font-mono text-xs md:text-sm text-muted-foreground tracking-wider leading-relaxed">
              Collaborations, commissions, exhibitions, and strange propositions are welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            <a
              href="https://wa.me/60149303546"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 flex-col justify-between border border-primary bg-primary px-5 py-4 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
                  Collaborations & commissions
                </span>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
              <span className="mt-4 font-display text-lg font-black uppercase tracking-tight">
                Discuss a project
              </span>
            </a>
            <a
              href="https://x.com/bryanlauwk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 flex-col justify-between border border-foreground/25 px-5 py-4 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
                  Studio notes & progress
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
              <span className="mt-4 font-display text-lg font-black uppercase tracking-tight">
                Follow the build on X
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
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

          <div className="flex flex-col items-center gap-3">
            <BrandSignature compact />
            <p className="exhibit-label text-center">
              © {currentYear} · you were here
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
