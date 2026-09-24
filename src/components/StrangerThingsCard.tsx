import { useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { slugFor } from "@/lib/slug";
import { previewSrcFor } from "@/lib/preview";
import { projectDestination } from "@/lib/project-destination";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  size?: "wide" | "tall" | "standard";
}

export function StrangerThingsCard({ project, index, size = "standard" }: StrangerThingsCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const destination = projectDestination(project.href);
  const previewSrc = previewSrcFor(project, size === "wide" ? { width: 960, height: 600 } : { width: 640, height: 500 });
  const num = String(index + 1).padStart(2, "0");
  const isWide = size === "wide";
  const isTall = size === "tall";
  return (
    <a
      href={destination ?? `/drops/${slugFor(project)}`}
      target={destination ? "_blank" : undefined}
      rel={destination ? "noopener noreferrer" : undefined}
      aria-label={destination ? `Try ${project.title} (opens in a new tab)` : `Read about ${project.title}`}
      className={`group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-sm border border-foreground/15 bg-card shadow-[var(--card-lift)] transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:transform-none ${isWide ? "lg:min-h-[25rem] lg:flex-row" : "lg:min-h-[31rem]"}`}
    >
      <div className={`relative shrink-0 overflow-hidden border-b border-foreground/15 bg-muted ${isWide ? "aspect-[8/5] lg:aspect-auto lg:h-full lg:w-[58%] lg:border-b-0 lg:border-r" : isTall ? "aspect-[5/4]" : "aspect-[8/5]"}`}>
        {previewSrc && !imageFailed ? (
          <img src={previewSrc} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)}
            className={`h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none ${isWide ? "lg:object-cover" : ""}`} />
        ) : (
          <div className="flex h-full items-center justify-center bg-grid-paper text-muted-foreground">
            <ImageOff className="h-8 w-8 opacity-40" aria-hidden="true" />
            <span className="sr-only">Preview unavailable</span>
          </div>
        )}
        <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 font-mono text-[11px] text-foreground" aria-hidden="true">No. {num}</span>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col p-5 md:p-6 ${isWide ? "lg:justify-center lg:p-8" : ""}`}>
        {project.tag && <span className="mb-3 font-mono text-[11px] uppercase tracking-wider text-primary">{project.tag}</span>}
        <h3 className={`font-display text-2xl font-black uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary ${isWide ? "md:text-4xl" : "md:text-3xl"}`}>{project.title}</h3>
        {project.description && <p className={`mt-3 text-sm leading-relaxed text-muted-foreground ${isWide || isTall ? "line-clamp-4" : "line-clamp-3"}`}>{project.description}</p>}
        <span className="mt-auto flex items-center justify-between gap-3 pt-6 font-mono text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary">
          {destination ? "Try it" : "Read the notes"}
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
