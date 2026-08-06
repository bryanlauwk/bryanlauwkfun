import { useMemo } from "react";
import { PlaygroundNav } from "@/components/playground/PlaygroundNav";
import { ArrivalSection } from "@/components/playground/ArrivalSection";
import { CurrentSeason } from "@/components/playground/CurrentSeason";
import { ArtifactsRow } from "@/components/playground/ArtifactsRow";
import { UpcomingSeason } from "@/components/playground/UpcomingSeason";
import { SeasonArchive } from "@/components/playground/SeasonArchive";
import { Laboratory } from "@/components/playground/Laboratory";
import { ExitStrip } from "@/components/playground/ExitStrip";
import { PlaygroundFooter } from "@/components/playground/PlaygroundFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — The Living Playground",
    description:
      "A living playground of small playable art and browser-born experiments by Bryan Lau. A new season is always growing.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  const { data: projects, isLoading } = usePublicProjects();

  const featured = projects?.[0];
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
          <ArtifactsRow />
          <UpcomingSeason />
          <SeasonArchive projects={rest} isLoading={isLoading} />
          <Laboratory />
          <ExitStrip />
        </main>

        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Index;
