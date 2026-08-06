import { useMemo } from "react";
import { PlaygroundNav } from "@/components/playground/PlaygroundNav";
import { ArrivalSection } from "@/components/playground/ArrivalSection";
import { CurrentSeason } from "@/components/playground/CurrentSeason";
import { FeaturedWorlds } from "@/components/playground/FeaturedWorlds";
import { FeaturedExperiences } from "@/components/playground/FeaturedExperiences";
import { IdeasForest } from "@/components/playground/IdeasForest";
import { DreamArchive } from "@/components/playground/DreamArchive";
import { ExitStrip } from "@/components/playground/ExitStrip";
import { PlaygroundFooter } from "@/components/playground/PlaygroundFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — The Living Playground",
    description:
      "Interactive art, playful technology and AI experiences by Bryan Lau. A living playground of small playable worlds.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  const { data: projects, isLoading } = usePublicProjects();

  // Current Drop is always the public project with the latest valid created_at.
  const featured = useMemo(() => {
    const list = projects ?? [];
    const dated = list
      .map((p) => ({ p, ts: p.created_at ? new Date(p.created_at).getTime() : NaN }))
      .filter((x) => Number.isFinite(x.ts))
      .sort((a, b) => b.ts - a.ts);
    return dated[0]?.p ?? list[0];
  }, [projects]);

  const rest = useMemo(
    () => (projects ?? []).filter((p) => p.id !== featured?.id),
    [projects, featured?.id]
  );

  return (
    <div className="living-playground relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="lp-depth" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <PlaygroundNav />

        <main id="main-content" className="flex-1">
          <ArrivalSection />
          <CurrentSeason project={featured} isLoading={isLoading} />
          <FeaturedWorlds projects={rest} isLoading={isLoading} />
          <FeaturedExperiences projects={rest} isLoading={isLoading} />
          <IdeasForest />
          <DreamArchive projects={projects ?? []} isLoading={isLoading} />
          <ExitStrip />
        </main>

        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Index;
