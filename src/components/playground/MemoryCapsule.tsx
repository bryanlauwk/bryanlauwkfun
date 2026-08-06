import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";

interface MemoryCapsuleProps {
  project: Project;
  index: number;
  isFocused?: boolean;
}

/** A season rendered as a glass world orb. */
export function MemoryCapsule({ project, index, isFocused = false }: MemoryCapsuleProps) {
  const num = String(index).padStart(2, "0");

  return (
    <Link
      to={`/drops/${slugFor(project)}`}
      className={`lp-world group w-[10.5rem] md:w-[11.5rem] ${isFocused ? "is-focused" : ""}`}
      aria-label={`Open ${project.title}`}
    >
      <span className="lp-world-sphere h-[10.5rem] w-[10.5rem] md:h-[11.5rem] md:w-[11.5rem]">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity duration-700 group-hover:opacity-80"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(190,210,255,0.7)_0.7px,transparent_0.8px)] [background-size:14px_14px]"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(139,108,255,0.28),transparent_60%)]"
        />
      </span>

      <span className="mt-5 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        Season {num}
      </span>
      <span className="mt-2 block text-sm font-light text-foreground transition-colors duration-500 group-hover:text-accent">
        {project.title}
      </span>
      {project.tag && (
        <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground/80">
          {project.tag}
        </span>
      )}
    </Link>
  );
}
