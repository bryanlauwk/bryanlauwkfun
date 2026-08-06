import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { worldFor } from "@/lib/lpWorld";
import { MiniWorld } from "./MiniWorld";

interface MemoryCapsuleProps {
  project: Project;
  index: number;
  isFocused?: boolean;
}

/**
 * A season rendered as a glass world orb.
 * The interior is a deterministic, code-generated mini-world derived from the
 * project's identity — never the project's own artwork.
 */
export function MemoryCapsule({ project, index, isFocused = false }: MemoryCapsuleProps) {
  const num = String(index + 1).padStart(2, "0");
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const spec = useMemo(
    () =>
      worldFor(
        `${project.id}::${project.title}`,
        `${project.title} ${project.tag ?? ""} ${project.description ?? ""}`
      ),
    [project.id, project.title, project.tag, project.description]
  );

  const uid = useMemo(() => `mw-${spec.seed.toString(36)}`, [spec.seed]);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <Link
      ref={ref}
      to={`/drops/${slugFor(project)}`}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={`lp-world group w-[10.5rem] md:w-[12.5rem] ${isFocused ? "is-focused" : ""}`}
      aria-label={`Open ${project.title}`}
      style={
        {
          ["--mw-x" as string]: tilt.x.toFixed(3),
          ["--mw-y" as string]: tilt.y.toFixed(3),
          ["--mw-tilt" as string]: spec.tilt,
        } as React.CSSProperties
      }
    >
      <span className="lp-world-sphere h-[10.5rem] w-[10.5rem] md:h-[12.5rem] md:w-[12.5rem]">
        <MiniWorld spec={spec} uid={uid} />
        {/* glass: refraction, caustic rim, specular highlight */}
        <span aria-hidden="true" className="lp-glass-refract" />
        <span aria-hidden="true" className="lp-glass-rim" />
        <span aria-hidden="true" className="lp-glass-spec" />
      </span>
      <span aria-hidden="true" className="lp-world-shadow" />

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
      <span className="sr-only">Capsule ecosystem: {spec.name}</span>
    </Link>
  );
}
