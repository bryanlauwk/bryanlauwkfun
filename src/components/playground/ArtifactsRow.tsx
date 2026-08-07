import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { CircleDot, SquareStack, Sprout, type LucideIcon } from "lucide-react";
import artifactArt from "@/assets/interactive-artifacts-v3.jpg";
import coinImg from "@/assets/artifacts/coin.jpg";
import keyImg from "@/assets/artifacts/key.jpg";
import stoneImg from "@/assets/artifacts/stone.jpg";
import chartImg from "@/assets/artifacts/chart.jpg";

interface CatalogueEntry {
  id: string;
  /** bundled preview image, when one exists */
  image?: string;
  /** fallback icon for pieces that don't have artwork yet */
  Icon?: LucideIcon;
}

/**
 * The catalogue's fixed line-up. Copy (name / format / concept) is editable via
 * the CMS; the four original pieces carry real previews cropped from the still
 * life, while newer concept pieces show an icon placeholder until art is added.
 */
const CATALOGUE: CatalogueEntry[] = [
  { id: "coin", image: coinImg },
  { id: "key", image: keyImg },
  { id: "stone", image: stoneImg },
  { id: "paper", image: chartImg },
  { id: "ring", Icon: CircleDot },
  { id: "mirror", Icon: SquareStack },
  { id: "seed", Icon: Sprout },
];

/**
 * Objects Catalogue — Bryan's kit of physical "building blocks". A painterly
 * hero still life sits above a catalogue grid; each card is one patentable,
 * adaptable piece that can be recombined into a custom interactive experience.
 */
export function ArtifactsRow() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  const { content } = useSiteContent();

  return (
    <section id="artifact" className="lp-band relative" aria-labelledby="artifact-heading">
      <div ref={ref} className={`lp-feature is-quiet ${inView ? "is-live" : ""}`}>
        <div className="lp-feature-art lp-feature-art--wide">
          <img
            src={artifactArt}
            alt="A dark still life of four concept objects: a milled coin, a translucent key, a lit stone and a folded paper chart."
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
          />
          <span className="lp-veil lp-veil--soft" />
          <span className="lp-seam-top" />
          <span className="lp-seam-bottom" />
        </div>

        <div className="relative mx-auto max-w-[110rem] px-6 pb-10 pt-[13rem] md:px-14 md:pb-16 md:pt-[19rem]">
          <div className="max-w-2xl">
            <p className="lp-label lp-label--violet">{content("artifacts.eyebrow")}</p>
            <h2 id="artifact-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
              {content("artifacts.heading")}
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
              {content("artifacts.intro")}
            </p>
          </div>

          {/* Catalogue grid */}
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATALOGUE.map((entry, i) => {
              const name = content(`artifacts.${entry.id}.name`);
              const format = content(`artifacts.${entry.id}.material`);
              const concept = content(`artifacts.${entry.id}.idea`);
              const Icon = entry.Icon;
              return (
                <li
                  key={entry.id}
                  className="lp-catalogue-card group flex flex-col overflow-hidden rounded-xl border border-[hsl(var(--lp-hair)/0.16)] bg-[hsl(var(--card)/0.5)] transition-colors hover:border-[hsl(var(--accent)/0.4)]"
                  style={{ ["--i" as string]: String(i) } as React.CSSProperties}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#05070d]">
                    {entry.image ? (
                      <img
                        src={entry.image}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(120%_90%_at_50%_20%,hsl(var(--accent)/0.14),transparent_70%)]">
                        {Icon && <Icon className="h-8 w-8 text-accent/70" aria-hidden="true" />}
                        <span className="lp-mono text-[0.6rem] text-muted-foreground/70">Concept · art in progress</span>
                      </div>
                    )}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-70" />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="lp-mono text-accent">{format}</p>
                    <h3 className="lp-display mt-2 text-lg text-foreground">{name}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                      {concept}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 max-w-2xl text-xs font-light leading-relaxed text-muted-foreground/80">
            {content("artifacts.closing")}
          </p>
        </div>
      </div>
    </section>
  );
}
