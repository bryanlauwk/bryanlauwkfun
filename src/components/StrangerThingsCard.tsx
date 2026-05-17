import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  isFocused?: boolean;
}

const CTA_VARIANTS = ["Explore", "Dive in", "Take a look", "See more", "Open it up"];

export function StrangerThingsCard({ project, index, isFocused = false }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || isFocused;

  const episodeNum = String(index + 1).padStart(2, "0");
  const ctaText = CTA_VARIANTS[index % CTA_VARIANTS.length];

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-full bg-card border-2 border-foreground rounded-2xl overflow-hidden transition-all duration-300 ${
          isActive
            ? "-translate-x-1 -translate-y-1 shadow-[8px_8px_0_hsl(var(--foreground))]"
            : "shadow-[4px_4px_0_hsl(var(--foreground))]"
        }`}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest font-medium">
            #{episodeNum}
          </span>
          {project.tag && (
            <span className="inline-flex items-center bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold">
              {project.tag}
            </span>
          )}
        </div>

        {/* Main content */}
        <div className="p-5 pt-2 min-h-[180px] flex flex-col">
          <h3 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-foreground leading-[0.95]">
            {project.title}
          </h3>

          <div
            className={`h-1 mb-4 bg-primary rounded-full transition-all duration-500 ease-out ${
              isActive ? "w-full" : "w-12"
            }`}
          />

          {project.description && (
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {project.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-5 text-foreground font-mono text-xs uppercase tracking-widest font-bold">
            <span>{ctaText}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? "translate-x-1 -translate-y-1" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </a>
  );
}
