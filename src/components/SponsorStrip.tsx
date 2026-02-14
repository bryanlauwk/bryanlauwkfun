import { usePublicSponsors } from "@/hooks/useSponsors";
import { Mail } from "lucide-react";

export function SponsorStrip() {
  const { data: sponsors } = usePublicSponsors();

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 mb-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
          Supported by
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {sponsors.map((sponsor) => {
          const content = sponsor.logo_url ? (
            <img
              src={sponsor.logo_url}
              alt={sponsor.name}
              className="h-10 md:h-12 w-auto max-w-[120px] md:max-w-[150px] object-contain opacity-25 grayscale mix-blend-luminosity hover:opacity-70 hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="group flex flex-col items-center gap-1.5 px-6 py-3 border border-dashed border-muted-foreground/20 rounded-lg hover:border-muted-foreground/40 transition-all duration-500">
              <div className="flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {sponsor.name}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors duration-500">
                Ad Space
              </span>
            </div>
          );

          return sponsor.website_url ? (
            <a
              key={sponsor.id}
              href={sponsor.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={sponsor.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}
