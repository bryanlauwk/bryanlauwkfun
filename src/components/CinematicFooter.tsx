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
              If it’s hard to explain, it probably belongs here.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            <a
              href="https://wa.me/60149303546?text=Hi%20Bryan%2C%20I%20have%20a%20strange%20idea%20for%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 flex-col justify-between border border-primary bg-primary px-5 py-4 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]">
                  Collaborations, commissions & odd requests
                </span>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
              <span className="mt-4 font-display text-lg font-black uppercase tracking-tight">
                Bring me a strange idea
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
                Watch it take shape
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

          <div className="mt-2 flex w-full max-w-2xl flex-col items-center border-t border-foreground/15 pt-8">
            <span className="relative block h-24 w-48 md:h-28 md:w-[13.5rem]">
              <BrandSignature className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-110 md:scale-125" />
            </span>
          </div>

          <p className="font-mono text-xs md:text-sm text-primary uppercase tracking-[0.3em] text-center">
            Good luck, have fun, don't die.
          </p>

          <p className="exhibit-label text-center">
            © {currentYear} · you were here
          </p>
        </div>
      </div>
    </footer>
  );
}
