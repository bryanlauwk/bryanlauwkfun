import { usePublicSponsors } from "@/hooks/useSponsors";
import { FloatingAdPlaceholder } from "@/components/FloatingAdPlaceholder";

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
            <FloatingAdPlaceholder name={sponsor.name} variant={sponsors.indexOf(sponsor)} />
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
