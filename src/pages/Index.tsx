import { useMemo } from "react";
import { LivingCanvas } from "@/components/playground/LivingCanvas";
import { PlaygroundNav } from "@/components/playground/PlaygroundNav";
import { ArrivalSection } from "@/components/playground/ArrivalSection";
import { CurrentSeason } from "@/components/playground/CurrentSeason";
import { InteractiveArtifact } from "@/components/playground/InteractiveArtifact";
import { UpcomingSeason } from "@/components/playground/UpcomingSeason";
import { SeasonArchive } from "@/components/playground/SeasonArchive";
import { Laboratory } from "@/components/playground/Laboratory";
import { QuietCompanion } from "@/components/playground/QuietCompanion";
import { PlaygroundFooter } from "@/components/playground/PlaygroundFooter";
import { GuestBook } from "@/components/GuestBook";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — A living playground",
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
      <LivingCanvas />

      <div className="relative z-10 flex min-h-screen flex-col">
        <PlaygroundNav />

        <main id="main-content" className="flex-1">
          <ArrivalSection />
          <CurrentSeason project={featured} isLoading={isLoading} />
          <InteractiveArtifact />
          <UpcomingSeason />
          <SeasonArchive projects={rest} isLoading={isLoading} />
          <Laboratory />

          <section id="signal" className="relative px-5 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-4xl">
              <GuestBook />
            </div>
          </section>
        </main>

        <PlaygroundFooter />
      </div>

      <QuietCompanion />
    </div>
  );
};

export default Index;
