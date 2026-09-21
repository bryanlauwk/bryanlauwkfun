import { ArrowUpRight } from "lucide-react";

export function CinematicFooter() {
  return (
    <footer id="contact" className="relative z-20 scroll-mt-36 border-t border-foreground/15 px-5 py-10 md:px-12 md:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">Got a beautifully bad idea?</h2>
            <p className="mt-3 text-sm text-muted-foreground">Let’s make something that probably shouldn’t exist.</p>
          </div>
          <a href="https://wa.me/60149303546?text=Hi%20Bryan%2C%20I%20have%20a%20strange%20idea%20for%20you" target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 self-start border border-primary bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">
            Let’s cause trouble <ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-foreground/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-primary">Thanks for not dying.</p>
          <nav aria-label="Social links" className="flex flex-wrap gap-5">
            {[["https://x.com/bryanlauwk", "Studio notes ↗"], ["https://github.com/bryanlauwk", "GitHub ↗"], ["https://linkedin.com/in/bryanlauwk", "LinkedIn ↗"]].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-mono text-[11px] text-muted-foreground hover:text-primary">{label}<span className="sr-only"> (opens in a new tab)</span></a>
            ))}
          </nav>
          <span className="font-mono text-[11px] text-muted-foreground">© {new Date().getFullYear()} Bryan Lau</span>
        </div>
      </div>
    </footer>
  );
}
