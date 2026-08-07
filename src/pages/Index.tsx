import { useMemo } from "react";
import { PlayNav } from "@/components/playable/PlayNav";
import { PlayHero } from "@/components/playable/PlayHero";
import { PlayExperiences } from "@/components/playable/PlayExperiences";
import { MediumPath } from "@/components/playable/MediumPath";
import { PlayPrinciples } from "@/components/playable/PlayPrinciples";
import { BuildTogether } from "@/components/playable/BuildTogether";
import { ClosingAbout } from "@/components/playable/ClosingAbout";
import { PlayFooter } from "@/components/playable/PlayFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — Make the world playable",
    description:
      "Interactive worlds by Bryan Lau that start in the browser, grow into shared spaces, and sometimes become objects you can keep.",
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

      <div className="relative z-10 flex min-h-screen flex-col">
        <PlayNav />

        <main id="main-content" className="flex-1">
          <PlayHero />
          <PlayExperiences featured={featured} rest={rest} isLoading={isLoading} />
          <MediumPath />
          <PlayPrinciples />
          <BuildTogether />
          <ClosingAbout />
        </main>

        <PlayFooter />
      </div>
    </div>
  );
};

export default Index;
