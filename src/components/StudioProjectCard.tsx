import { useState } from "react";
import type { Project } from "@/hooks/useProjects";
import { projectDestination } from "@/lib/project-destination";
import { projectPresentation } from "@/lib/studio-projects";
import { previewSrcFor } from "@/lib/preview";

export function StudioProjectImage({ project, eager = false }: { project: Project; eager?: boolean }) {
  // The capture service returns a blank image for Artoy. Use a verified
  // screenshot until an authored project image is supplied in the catalogue.
  const artoy = (() => { try { return new URL(project.href).hostname === "artoy.bryanlauwk.fun"; } catch { return false; } })();
  const src = artoy && !project.image_url ? "/previews/artoy-studio.png" : previewSrcFor(project, { width: 1200 });
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  return <div className="studio-img">
    <span className="studio-image-fallback" aria-hidden="true">{project.title}<small>Open the experience ↗</small></span>
    {src && src !== failedSrc && <img src={src} alt={`${project.title} preview`} width={1200} height={750} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailedSrc(src)} />}
  </div>;
}

export default function StudioProjectCard({ project, index }: { project: Project; index: number }) {
  const destination = projectDestination(project.href);
  const { category, summary, action } = projectPresentation(project);
  const content = <>
    <StudioProjectImage project={project} />
    <div className="studio-meta">
      <div><h3>{String(index + 1).padStart(2, "0")} / {project.title}</h3><p>{summary}</p></div>
      <span>{category}</span>
    </div>
    <span className="studio-card-action">{destination ? `${action} ↗` : "In progress"}</span>
  </>;
  return destination
    ? <a href={destination} target="_blank" rel="noopener noreferrer" className="studio-card" aria-label={`${action} ${project.title} (opens in a new tab)`}>{content}</a>
    : <article className="studio-card studio-card-unavailable">{content}</article>;
}
