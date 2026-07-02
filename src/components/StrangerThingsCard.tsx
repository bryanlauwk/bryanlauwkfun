import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  isFocused?: boolean;
}

const CTA_VARIANTS = ["Open File", "Declassify", "Review Evidence", "Field Report", "Access Log"];
const CLASSIFICATIONS = ["Confidential", "Eyes Only", "Restricted", "Case Open", "Live Ops"];

export function StrangerThingsCard({ project, index, isFocused = false }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || isFocused;

  const episodeNum = String(index + 1).padStart(2, "0");
  const caseNum = `BL-${new Date(project.created_at ?? Date.now()).getFullYear()}-${episodeNum}${(index * 7 + 13) % 100}`;
  const ctaText = CTA_VARIANTS[index % CTA_VARIANTS.length];
  const classification = CLASSIFICATIONS[index % CLASSIFICATIONS.length];
  const stampRotate = ((index % 5) - 2) * 3;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${ctaText}: ${project.title}`}
    >
      <div
        className={`relative h-full bg-card border-2 border-foreground rounded-lg overflow-hidden transition-all duration-300 ${
          isActive
            ? "-translate-x-1 -translate-y-1 shadow-[8px_8px_0_hsl(var(--foreground))] rotate-[-0.3deg]"
            : "shadow-[4px_4px_0_hsl(var(--foreground))]"
        }`}
      >
        {/* dossier tape corners */}
        <span
          className="absolute -top-1.5 left-4 w-14 h-4 bg-foreground/85 rotate-[-8deg] pointer-events-none z-10"
          aria-hidden="true"
        />
        <span
          className="absolute -top-1 right-6 w-10 h-3 bg-foreground/70 rotate-[6deg] pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Classification stamp — appears on hover */}
        <span
          className={`absolute top-14 right-3 dossier-stamp text-[9px] z-20 pointer-events-none transition-all duration-300 ${
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transform: `rotate(${stampRotate}deg)` }}
        >
          {classification}
        </span>

        {/* File tag header — grid paper strip */}
        <div className="px-5 pt-5 pb-2 flex items-center justify-between bg-grid-paper border-b-2 border-dashed border-foreground/20">
          <span className="font-mono text-[10px] text-foreground uppercase tracking-[0.25em] font-bold">
            File · {episodeNum}
          </span>
          {project.tag && (
            <span className="inline-flex items-center bg-foreground text-primary rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold">
              {project.tag}
            </span>
          )}
        </div>

        {/* Case number meta strip */}
        <div className="px-5 py-1.5 border-b border-dashed border-foreground/15 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Case № {caseNum}</span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dossier-red))] animate-pulse" />
            Live
          </span>
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

          {/* Redacted meta bar — reveals on hover */}
          <div
            className={`mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-60"
            }`}
          >
            <span className="inline-block h-2 w-8 bg-foreground rounded-sm" aria-hidden="true" />
            <span className="text-muted-foreground">Subject</span>
            <span className="inline-block h-2 w-12 bg-foreground rounded-sm" aria-hidden="true" />
            <span className="text-muted-foreground">Status</span>
            <span className="inline-block h-2 w-6 bg-[hsl(var(--dossier-red))] rounded-sm" aria-hidden="true" />
          </div>

          <div className={`inline-flex items-center gap-2 mt-5 self-start px-3 py-1.5 border-2 border-foreground rounded-sm font-mono text-xs uppercase tracking-widest font-bold text-foreground transition-all duration-200 ${
            isActive ? "bg-primary shadow-[3px_3px_0_hsl(var(--foreground))]" : "bg-transparent"
          }`}>
            <span>{ctaText}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? "translate-x-1 -translate-y-1" : ""
              }`}
            />
          </div>
        </div>

        {/* Footer barcode-style meta */}
        <div className="px-5 py-2 border-t-2 border-dashed border-foreground/20 bg-grid-paper flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>bryan.fun / drops</span>
          <span className="flex gap-[2px] items-end" aria-hidden="true">
            {[3, 5, 2, 6, 3, 4, 2, 5, 3].map((h, i) => (
              <span key={i} className="w-[2px] bg-foreground" style={{ height: `${h * 2}px` }} />
            ))}
          </span>
        </div>
      </div>
    </a>
  );
}
