import { useMemo } from "react";
import { PlayNav } from "@/components/playable/PlayNav";
import { PlayHero } from "@/components/playable/PlayHero";
import { Brewing } from "@/components/playable/Brewing";
import { PlayExperiences } from "@/components/playable/PlayExperiences";
import { ClosingAbout } from "@/components/playable/ClosingAbout";
import { PlayFooter } from "@/components/playable/PlayFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — Making curiosity playable",
    description:
      "Interactive experiments by Bryan Lau across screens, spaces and the physical world — browser games, simulations and creative technology.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  const { data: projects, isLoading } = usePublicProjects();

  // The newest real playable — featured once, and only once.
  const featured = useMemo(() => {
    const list = projects ?? [];
    const dated = list
      .map((p) => ({ p, ts: p.created_at ? new Date(p.created_at).getTime() : NaN }))
      .filter((x) => Number.isFinite(x.ts))
      .sort((a, b) => b.ts - a.ts);
    return dated[0]?.p ?? list[0];
  }, [projects]);

  // Every other real playable, exactly once.
  const rest = useMemo(
    () => (projects ?? []).filter((p) => p.id !== featured?.id),
    [projects, featured?.id]
  );

  return (
    <div className="playable relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pw-backdrop" aria-hidden="true" />
      <div className="pw-grid" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <PlayNav />

        <main id="main-content" className="flex-1">
          <PlayHero />
          <Brewing />
          <PlayExperiences featured={featured} rest={rest} isLoading={isLoading} />
          <ClosingAbout />
        </main>

        <PlayFooter />
      </div>
    </div>
  );
};

export default Index;
