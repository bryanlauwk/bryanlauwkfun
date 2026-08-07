import { Eye, Sliders, Megaphone, Link2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const MOVES = [
  { id: "notice", Icon: Eye, accent: "cyan" },
  { id: "tinker", Icon: Sliders, accent: "lime" },
  { id: "amplify", Icon: Megaphone, accent: "coral" },
  { id: "extend", Icon: Link2, accent: "cream" },
] as const;

/** Four creative moves — methodology, not curriculum. */
export function CreativeMoves() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  const { content } = useSiteContent();

  return (
    <section className="pw-section px-4 md:px-10" aria-labelledby="moves-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-section-head">
          <div>
            <p className="pw-eyebrow pw-eyebrow--lime">{content("play.movesEyebrow")}</p>
            <h2 id="moves-heading" className="pw-h2 mt-3">
              {content("play.movesHeading")}
            </h2>
          </div>
        </div>

        <div ref={ref} className={`mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${inView ? "pw-in" : ""}`}>
          {MOVES.map(({ id, Icon, accent }, i) => (
            <div
              key={id}
              className={`pw-panel pw-clip pw-move pw-accent-${accent} pw-tilt`}
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <span className="pw-move-index" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="pw-chain-icon" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="pw-h3 mt-4 text-lg">{content(`play.move.${id}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {content(`play.move.${id}.body`)}
              </p>
              <span className="pw-move-trace" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
