import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import artifactArt from "@/assets/interactive-artifacts-v3.jpg";

interface Piece {
  id: string;
  name: string;
  material: string;
  idea: string;
  /** hotspot centre, in % of the painting */
  x: number;
  y: number;
}

/** Hotspot positions are fixed to the painting; copy is editable via the CMS. */
const PIECE_POSITIONS = [
  { id: "coin", x: 12.5, y: 58 },
  { id: "key", x: 35, y: 55 },
  { id: "stone", x: 59, y: 58 },
  { id: "paper", x: 84, y: 52 },
] as const;

/**
 * Interactive Artifact — a wide editorial still life. Hovering or focusing a
 * piece surfaces a short concept note. These are prototypes; nothing is sold.
 */
export function ArtifactsRow() {
  const [active, setActive] = useState<Piece | null>(null);
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  const { content } = useSiteContent();

  const PIECES: Piece[] = PIECE_POSITIONS.map((pos) => ({
    id: pos.id,
    x: pos.x,
    y: pos.y,
    name: content(`artifacts.${pos.id}.name`),
    material: content(`artifacts.${pos.id}.material`),
    idea: content(`artifacts.${pos.id}.idea`),
  }));

  return (
    <section id="artifact" className="lp-band relative" aria-labelledby="artifact-heading">
      <div ref={ref} className={`lp-feature is-quiet ${inView ? "is-live" : ""}`}>

        <div className="lp-feature-art lp-feature-art--wide">
          <img
            src={artifactArt}
            alt="Four concept objects resting on dark stone: a milled coin, a translucent key, a lit stone and a folded paper chart."
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
          />
          <span className="lp-veil lp-veil--soft" />
          <span className="lp-seam-top" />
          <span className="lp-seam-bottom" />

          <div className="absolute inset-0">
            {PIECES.map((piece) => (
              <button
                key={piece.id}
                type="button"
                className={`lp-hotspot ${active?.id === piece.id ? "is-active" : ""}`}
                style={{ left: `${piece.x}%`, top: `${piece.y}%` }}
                onPointerEnter={() => setActive(piece)}
                onPointerLeave={() => setActive((a) => (a?.id === piece.id ? null : a))}
                onFocus={() => setActive(piece)}
                onBlur={() => setActive((a) => (a?.id === piece.id ? null : a))}
                onClick={() => setActive((a) => (a?.id === piece.id ? null : piece))}
                aria-label={`${piece.name} — concept note`}
                aria-expanded={active?.id === piece.id}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-[110rem] px-6 pb-6 pt-[13rem] md:px-14 md:pb-10 md:pt-[19rem]">
          <div className="grid gap-8 md:grid-cols-[minmax(0,26rem)_minmax(0,26rem)] md:gap-20">
            <div>
              <p className="lp-label lp-label--violet">{content("artifacts.eyebrow")}</p>
              <h2 id="artifact-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
                {content("artifacts.heading")}
              </h2>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                {content("artifacts.intro")}
              </p>
            </div>

            <div className="lp-plate lp-plate--overlap min-h-[10rem]">
              <div role="status" aria-live="polite">
                {active ? (
                  <>
                    <p className="lp-mono text-accent">{active.material}</p>
                    <h3 className="lp-display mt-3 text-xl text-foreground">{active.name}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {active.idea}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="lp-mono text-muted-foreground/70">Four pieces</p>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {content("artifacts.idlePrompt")}
                    </p>
                  </>
                )}
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[hsl(var(--lp-hair)/0.14)] pt-4">
                {PIECES.map((piece) => (
                  <li key={piece.id}>
                    <button
                      type="button"
                      className={`lp-mono transition-colors ${
                        active?.id === piece.id ? "text-accent" : "text-muted-foreground/70 hover:text-foreground"
                      }`}
                      onFocus={() => setActive(piece)}
                      onPointerEnter={() => setActive(piece)}
                      onClick={() => setActive(piece)}
                    >
                      {piece.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
