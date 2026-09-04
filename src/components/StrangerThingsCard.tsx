import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { slugFor } from "@/lib/slug";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  isFocused?: boolean;
}

export function StrangerThingsCard({ project, index, isFocused = false }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const isActive = isHovered || isFocused;

  const num = String(index + 1).padStart(2, "0");
  const year = new Date(project.created_at ?? Date.now()).getFullYear();

  return (
    <Link
      to={`/drops/${slugFor(project)}`}
      className="group relative block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open ${project.title}`}
    >
      <div
        className={`relative h-full border overflow-hidden transition-colors duration-200 ${
          isActive
            ? "bg-primary border-primary"
            : "bg-card border-foreground/15 shadow-[var(--card-lift)]"
        }`}
      >
        <div className="relative aspect-[8/5] overflow-hidden border-b border-foreground/15 bg-muted">
          {project.image_url && !imageFailed ? (
            <img
              src={project.image_url}
              alt={`${project.title} website preview`}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className={`h-full w-full object-cover object-top transition duration-500 motion-reduce:transition-none ${
                isActive ? "scale-[1.025] saturate-100" : "saturate-[0.82]"
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-grid-paper text-muted-foreground">
              <ImageOff className="h-8 w-8 opacity-40" aria-hidden="true" />
              <span className="sr-only">Preview unavailable</span>
            </div>
          )}
          <span className="absolute bottom-2 left-2 border border-background/40 bg-background/85 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
            Live preview
          </span>
        </div>

        {/* ghost numeral */}
        <span
          className={`absolute -top-2 right-3 font-display text-8xl font-black leading-none pointer-events-none select-none transition-colors duration-200 ${
            isActive ? "text-background/20" : "text-foreground/[0.06]"
          }`}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Main content */}
        <div className="p-6 min-h-[220px] flex flex-col relative">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 ${
                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              Exhibit {num}
            </span>
            {project.tag && (
              <span
                className={`inline-flex items-center border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold transition-colors duration-200 ${
                  isActive
                    ? "border-primary-foreground/60 text-primary-foreground"
                    : "border-primary/60 text-primary"
                }`}
              >
                {project.tag}
              </span>
            )}
          </div>

          <h3
            className={`font-display text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 leading-[0.95] transition-colors duration-200 ${
              isActive ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {project.title}
          </h3>

          <div
            className={`h-1 mb-4 transition-all duration-500 ease-out ${
              isActive ? "w-full bg-primary-foreground" : "w-12 bg-primary"
            }`}
          />

          {project.description && (
            <p
              className={`text-sm leading-relaxed flex-1 transition-colors duration-200 ${
                isActive ? "text-primary-foreground/85" : "text-muted-foreground"
              }`}
            >
              {project.description}
            </p>
          )}

          <div
            className={`inline-flex items-center gap-2 mt-5 self-start px-4 py-2 border font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-200 ${
              isActive
                ? "bg-background text-foreground border-background"
                : "bg-transparent text-foreground border-foreground/25"
            }`}
          >
            <span>Enter</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? "translate-x-1 -translate-y-1" : ""
              }`}
            />
          </div>
        </div>

        {/* Footer meta — plaque line */}
        <div
          className={`px-6 py-2.5 border-t flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] transition-colors duration-200 ${
            isActive
              ? "border-primary-foreground/30 text-primary-foreground/80"
              : "border-foreground/10 text-muted-foreground"
          }`}
        >
          <span>{project.tag ?? "experiment"}</span>
          <span>{year}</span>
        </div>
      </div>
    </Link>
  );
}
