import { useMemo } from "react";
import { PlaygroundNav } from "@/components/playground/PlaygroundNav";
import { ArrivalSection } from "@/components/playground/ArrivalSection";
import { Room01 } from "@/components/playground/Room01";
import { CurrentSeason } from "@/components/playground/CurrentSeason";
import { FieldNotes } from "@/components/playground/FieldNotes";
import { SignalPath } from "@/components/playground/SignalPath";
import { ArtifactsRow } from "@/components/playground/ArtifactsRow";
import { UpcomingSeason } from "@/components/playground/UpcomingSeason";
import { PastSeasons } from "@/components/playground/PastSeasons";
import { CommissionNote } from "@/components/playground/CommissionNote";
import { ExitStrip } from "@/components/playground/ExitStrip";
import { PlaygroundFooter } from "@/components/playground/PlaygroundFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { useSEO } from "@/hooks/useSEO";


const Index = () => {
  useSEO({
    title: "Bryan Lau — The Living Playground",
    description:
      "Interactive art, playful technology and AI experiences by Bryan Lau. A living playground of small playable worlds.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  const { data: projects, isLoading } = usePublicProjects();
  const { content } = useSiteContent();

  // "Brewing" (default) keeps the Current Drop slot mysterious and lists every
  // drop under Past Seasons. Switch to "live" to feature the newest drop.
  const brewing = content("current.mode").toLowerCase() !== "live";

  // When live, Current Drop is the public project with the latest created_at.
  const featured = useMemo(() => {
    if (brewing) return undefined;
    const list = projects ?? [];
    const dated = list
      .map((p) => ({ p, ts: p.created_at ? new Date(p.created_at).getTime() : NaN }))
      .filter((x) => Number.isFinite(x.ts))
      .sort((a, b) => b.ts - a.ts);
    return dated[0]?.p ?? list[0];
  }, [projects, brewing]);

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
          <PastSeasons projects={rest} isLoading={isLoading} />
          <ExitStrip />
        </main>

        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Index;
