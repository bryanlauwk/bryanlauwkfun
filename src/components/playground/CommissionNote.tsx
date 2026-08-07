import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

/**
 * The quiet collaboration path — an invitation, not a funnel. No pricing, no
 * logos, no claims. Links to the existing studio destination.
 */
export function CommissionNote() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const { content } = useSiteContent();

  return (
    <section
      id="commission"
      className="lp-band relative px-6 py-16 md:px-14 md:py-20"
      aria-labelledby="commission-heading"
    >
      <div
        ref={ref}
        className={`mx-auto max-w-[110rem] ${inView ? "lp-fade" : "opacity-0"}`}
      >
        <div className="lp-commission">
          <p className="lp-label lp-label--violet">{content("commission.eyebrow")}</p>
          <h2 id="commission-heading" className="lp-display mt-5 text-2xl text-foreground md:text-[2rem]">
            {content("commission.heading")}
          </h2>
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            {content("commission.body")}
          </p>
          <a
            href={content("about.studioUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-button mt-8"
          >
            {content("commission.cta")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
