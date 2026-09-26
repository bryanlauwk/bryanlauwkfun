import { useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { slugFor } from "@/lib/slug";
import { previewSrcFor } from "@/lib/preview";
import { projectCategory, projectDestination } from "@/lib/project-destination";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
}

export function StrangerThingsCard({ project }: StrangerThingsCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const destination = projectDestination(project.href);
  const previewSrc = previewSrcFor(project, { width: 900, height: 570 });
  const category = projectCategory(project.tag);
  const categoryLabel = category ?? project.tag?.trim();
  return (
    <a
      href={destination ?? `/drops/${slugFor(project)}`}
      target={destination ? "_blank" : undefined}
      rel={destination ? "noopener noreferrer" : undefined}
      aria-label={destination ? `Try ${project.title} (opens in a new tab)` : `Read about ${project.title}`}
      className="project-card group flex h-full min-w-0 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <div className="project-card-image relative aspect-[1.58/1] overflow-hidden bg-secondary">
        {previewSrc && !imageFailed ? (
          <img src={previewSrc} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground"><ImageOff className="h-7 w-7 opacity-40" aria-hidden="true" /><span className="sr-only">Preview unavailable</span></div>
        )}
        <span className="project-card-open absolute bottom-2.5 right-2.5 grid h-9 w-9 translate-y-2 place-items-center bg-primary text-primary-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
      </div>
      <div className="flex flex-1 flex-col border-b border-border pb-4 pt-3">
        {categoryLabel && <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">{categoryLabel}</span>}
        <h3 className="project-card-title mt-1.5 text-lg leading-[1.04] text-foreground transition-colors group-hover:text-primary md:text-xl">{project.title}</h3>
        {project.description && <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{project.description}</p>}
        <span className="mt-auto flex items-center gap-1.5 pt-2.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground group-hover:text-primary">{destination ? "Play / explore" : "See the build"}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
      </div>
    </a>
  );
}
