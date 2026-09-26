import { ArrowUpRight } from "lucide-react";
import { BrandSignature } from "./BrandSignature";

export function CinematicFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border bg-paper px-5 py-8 md:px-0 md:py-10">
      <div className="editorial-wrap">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Got something people should play?</p>
            <h2 className="section-title text-2xl md:text-3xl">LET’S MAKE A THING.</h2>
          </div>
          <a href="https://wa.me/60149303546?text=Hi%20Bryan%2C%20I%20have%20a%20playable%20idea%20for%20you" target="_blank" rel="noopener noreferrer" className="editorial-button editorial-button-red self-start sm:self-auto">
            Message Bryan <ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">Good luck. Have fun. Don’t die.</p>
          <nav aria-label="Social links" className="flex flex-wrap gap-5">
            {[["https://x.com/bryanlauwk", "X"], ["https://github.com/bryanlauwk", "GitHub"], ["https://linkedin.com/in/bryanlauwk", "LinkedIn"]].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary">{label} ↗<span className="sr-only"> (opens in a new tab)</span></a>
            ))}
          </nav>
          <span className="font-mono text-[10px] text-muted-foreground">© {new Date().getFullYear()} Bryan LauWK · Kuala Lumpur</span>
        </div>
        <div className="mt-5 flex justify-center border-t border-border pt-5">
          <span className="relative block h-24 w-48 md:h-28 md:w-[13.5rem]" aria-hidden="true">
            <BrandSignature className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-110" />
          </span>
        </div>
      </div>
    </footer>
  );
}
