import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";

interface MemoryCapsuleProps {
  project: Project;
  index: number;
  isFocused?: boolean;
}

export function MemoryCapsule({ project, index, isFocused = false }: MemoryCapsuleProps) {
  const year = new Date(project.created_at ?? Date.now()).getFullYear();
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/drops/${slugFor(project)}`}
      className={`lp-capsule group ${isFocused ? "is-focused" : ""}`}
      aria-label={`Open ${project.title}`}
    >
      <span className="lp-capsule-glow" aria-hidden="true" />

      <div className="relative flex h-full flex-col p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="lp-label">Memory {num}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{year}</span>
        </div>

        <h3 className="mt-5 font-tide text-2xl leading-tight text-foreground transition-colors duration-500 group-hover:text-accent md:text-[1.7rem]">
          {project.title}
        </h3>

        {project.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {project.tag ? <span className="lp-chip">{project.tag}</span> : <span />}
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors group-hover:text-accent">
            Open
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
