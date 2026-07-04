import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { slugFor } from "@/lib/slug";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  isFocused?: boolean;
}

export function StrangerThingsCard({ project, index, isFocused = false }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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
        className={`relative h-full bg-card border-2 border-foreground rounded-lg overflow-hidden transition-all duration-300 ${
          isActive
            ? "-translate-x-1 -translate-y-1 shadow-[8px_8px_0_hsl(var(--foreground))] rotate-[-0.3deg]"
            : "shadow-[4px_4px_0_hsl(var(--foreground))]"
        }`}
      >
        {/* tape corner */}
        <span
          className="absolute -top-1.5 left-4 w-14 h-4 bg-foreground/85 rotate-[-8deg] pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* header strip */}
        <div className="px-5 pt-5 pb-2 flex items-center justify-between bg-grid-paper border-b-2 border-dashed border-foreground/20">
          <span className="font-mono text-[10px] text-foreground uppercase tracking-[0.25em] font-bold">
            No. {num}
          </span>
          {project.tag && (
            <span className="inline-flex items-center bg-foreground text-primary rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold">
              {project.tag}
            </span>
          )}
        </div>

        {/* Main content */}
        <div className="p-5 min-h-[200px] flex flex-col">
          <h3 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-foreground leading-[0.95]">
            {project.title}
          </h3>

          <div
            className={`h-1.5 mb-4 bg-primary rounded-full transition-all duration-500 ease-out ${
              isActive ? "w-full" : "w-12"
            }`}
          />

          {project.description && (
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 font-mono">
              {project.description}
            </p>
          )}

          <div className={`inline-flex items-center gap-2 mt-5 self-start px-3 py-1.5 border-2 border-foreground rounded-sm font-mono text-xs uppercase tracking-widest font-bold text-foreground transition-all duration-200 ${
            isActive ? "bg-primary shadow-[3px_3px_0_hsl(var(--foreground))]" : "bg-transparent"
          }`}>
            <span>Play</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? "translate-x-1 -translate-y-1" : ""
              }`}
            />
          </div>
        </div>

        {/* Footer meta */}
        <div className="px-5 py-2 border-t-2 border-dashed border-foreground/20 bg-grid-paper flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>{project.tag ?? "experiment"}</span>
          <span>{year}</span>
        </div>
      </div>
    </a>
  );
}
