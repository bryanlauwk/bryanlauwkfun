import { useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { slugFor } from "@/lib/slug";
import { previewSrcFor } from "@/lib/preview";
import { projectDestination } from "@/lib/project-destination";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
}

export function StrangerThingsCard({ project, index }: StrangerThingsCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const destination = projectDestination(project.href);
  const previewSrc = previewSrcFor(project, { width: 640, crop: 400 });
  const num = String(index + 1).padStart(2, "0");
  return (
    <a
      href={destination ?? `/drops/${slugFor(project)}`}
      target={destination ? "_blank" : undefined}
      rel={destination ? "noopener noreferrer" : undefined}
      aria-label={destination ? `Try ${project.title} (opens in a new tab)` : `Read about ${project.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-foreground/15 bg-card shadow-[var(--card-lift)] transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:transform-none"
    >
      <div className="relative aspect-[8/5] overflow-hidden border-b border-foreground/15 bg-muted">
        {previewSrc && !imageFailed ? (
          <img src={previewSrc} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:transform-none" />
        ) : (
          <div className="flex h-full items-center justify-center bg-grid-paper text-muted-foreground">
            <ImageOff className="h-8 w-8 opacity-40" aria-hidden="true" />
            <span className="sr-only">Preview unavailable</span>
          </div>
        )}
        <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 font-mono text-[11px] text-foreground" aria-hidden="true">No. {num}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {project.tag && <span className="mb-3 font-mono text-[11px] uppercase tracking-wider text-primary">{project.tag}</span>}
        <h3 className="font-display text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
        {project.description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>}
        <span className="mt-auto flex items-center justify-between gap-3 pt-6 font-mono text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary">
          {destination ? "Try it" : "Read the notes"}
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
