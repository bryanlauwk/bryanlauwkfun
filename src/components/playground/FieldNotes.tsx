import { Eye, Waves, Brain } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const NOTES = [
  { id: "one", Icon: Eye },
  { id: "two", Icon: Waves },
  { id: "three", Icon: Brain },
] as const;

/**
 * Field Notes — a quiet editorial register (an index list, not a card grid) so
 * research directions never read as finished projects.
 */
export function FieldNotes() {
  const { ref, inView } = useReveal<HTMLDListElement>(0.12);
  const { content } = useSiteContent();

  return (
    <section
      id="notes"
      className="lp-band relative scroll-mt-24 px-6 py-14 md:px-14 md:py-20"
      aria-labelledby="notes-heading"
    >
      <div className="mx-auto grid max-w-[110rem] gap-10 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-16">
        <div>
          <p className="lp-label lp-label--violet">{content("notes.eyebrow")}</p>
          <h2 id="notes-heading" className="lp-display mt-4 text-2xl text-foreground md:text-[2rem]">
            {content("notes.heading")}
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            {content("notes.intro")}
          </p>
        </div>

        <dl
          ref={ref}
          className={`lp-notes-index ${inView ? "is-live" : ""}`}
        >
          {NOTES.map(({ id, Icon }, i) => (
            <div
              key={id}
              className="lp-note-row"
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <dt className="flex items-baseline gap-4">
                <span className="lp-mono text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="lp-display text-lg text-foreground">{content(`notes.${id}.title`)}</span>
                <Icon className="ml-auto h-4 w-4 shrink-0 text-accent/70" aria-hidden="true" />
              </dt>
              <dd className="mt-2 pl-10">
                <span className="lp-mono text-accent">{content(`notes.${id}.science`)}</span>
                <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
                  {content(`notes.${id}.premise`)}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
