import { redirectProject } from "@/lib/redirect-project";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePublicProjects } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { projectDestination } from "@/lib/project-destination";
import { StudioState } from "@/components/StudioChrome";
import { useSEO } from "@/hooks/useSEO";

// Keep shared URLs working without the legacy intermediary page.
export default function DropDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, refetch, isFetching } = usePublicProjects();
  const project = data?.find(p => slugFor(p) === slug);
  const href = projectDestination(project?.href);
  const destination = href && !(new URL(href).origin === window.location.origin && new URL(href).pathname.startsWith("/drops")) ? href : null;
  useSEO({ title: `${project?.title ?? "Project"} — 881230.studio`, description: project?.description ?? "Explore games, web experiences and objects by Bryan Lau Wai Kit.", canonical: destination ?? `https://www.bryanlauwk.fun/drops/${slug}`, noindex: !destination });
  useEffect(() => {
    if (destination) redirectProject(destination);
  }, [destination]);

  if (destination) return <StudioState title={`Opening ${project!.title}…`}>
    <p role="status">Taking you straight to the project.</p>
    <a href={destination} className="studio-button">Open project ↗</a>
  </StudioState>;
  if (isLoading) return <StudioState title="Finding your project…"><p role="status">Just a moment.</p></StudioState>;
  if (isError && !project) return <StudioState title="Couldn’t load this project.">
    <p>Please try again, or explore the collection.</p><button className="studio-button" disabled={isFetching} onClick={() => void refetch()}>{isFetching ? "Trying again…" : "Try again"}</button>
  </StudioState>;
  return <StudioState title={project ? project.title : "This project has moved."}>
    <p>{project ? "This project isn’t available to open yet." : "The link may be out of date. Find something to explore in the current collection."}</p>
  </StudioState>;
}
