import { useMemo } from "react";
import { PlaygroundNav } from "@/components/playground/PlaygroundNav";
import { ArrivalSection } from "@/components/playground/ArrivalSection";
import { NowShowing } from "@/components/playground/NowShowing";
import { Collection } from "@/components/playground/Collection";
import { FieldNotes } from "@/components/playground/FieldNotes";
import { SignalPath } from "@/components/playground/SignalPath";
import { UpcomingSeason } from "@/components/playground/UpcomingSeason";
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

  // The newest public drop by created_at — the only thing shown in Room 01.
  const latest = useMemo(() => {
    const list = projects ?? [];
    const dated = list
      .map((p) => ({ p, ts: p.created_at ? new Date(p.created_at).getTime() : NaN }))
      .filter((x) => Number.isFinite(x.ts))
      .sort((a, b) => b.ts - a.ts);
    return dated[0]?.p ?? list[0];
  }, [projects]);

  // Every other real drop, exactly once, in the permanent collection.
  const collection = useMemo(
    () => (projects ?? []).filter((p) => p.id !== latest?.id),
    [projects, latest?.id]
  );

  return (
    <div className="living-playground relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="lp-depth" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <PlaygroundNav />

        <main id="main-content" className="flex-1">
          <ArrivalSection />
          <NowShowing project={latest} isLoading={isLoading} />
          <Collection projects={collection} isLoading={isLoading} />
          <SignalPath />
          <FieldNotes />
          <UpcomingSeason />
          <ExitStrip />
        </main>

        <PlaygroundFooter />
      </div>
    </div>
  );
};

export default Index;
