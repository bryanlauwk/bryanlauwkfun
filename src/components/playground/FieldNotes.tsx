import { Eye, Waves, Brain } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const NOTES = [
  { id: "one", Icon: Eye },
  { id: "two", Icon: Waves },
  { id: "three", Icon: Brain },
] as const;

/**
 * Field Notes — the intellectual foundations behind future experiments.
 * Explicitly labelled as research directions, never as finished work.
 */
export function FieldNotes() {
  const { ref, inView } = useReveal<HTMLUListElement>(0.12);
  const { content } = useSiteContent();

  return (
    <section id="notes" className="lp-band relative px-6 py-16 md:px-14 md:py-24" aria-labelledby="notes-heading">
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-2xl">
          <p className="lp-label lp-label--violet">{content("notes.eyebrow")}</p>
          <h2 id="notes-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            {content("notes.heading")}
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
            {content("notes.intro")}
          </p>
        </div>

        <ul
          ref={ref}
          className={`lp-room-grid mt-12 grid grid-cols-1 gap-px overflow-hidden md:grid-cols-3 ${inView ? "is-live" : ""}`}
        >
          {NOTES.map(({ id, Icon }, i) => (
            <li
              key={id}
              className="lp-note"
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="lp-mono mt-6 text-muted-foreground/80">
                Direction {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="lp-display mt-2 text-xl text-foreground">{content(`notes.${id}.title`)}</h3>
              <p className="lp-mono mt-4 text-accent">{content(`notes.${id}.science`)}</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {content(`notes.${id}.premise`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
