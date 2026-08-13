import { useMemo } from "react";
import { PlayNav } from "@/components/playable/PlayNav";
import { PlayHero } from "@/components/playable/PlayHero";
import { ConceptGallery } from "@/components/playable/ConceptGallery";
import { BuildMethod } from "@/components/playable/BuildMethod";
import { BrowserArchive } from "@/components/playable/BrowserArchive";
import { ClosingAbout } from "@/components/playable/ClosingAbout";
import { PlayFooter } from "@/components/playable/PlayFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Bryan Lau — Making Curiosity Playable",
    description:
      "Weird creative-tech experiments by Bryan Lau across screen, space and stuff—browser toys, playful machines and badly behaved objects.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  const { data: projects, isLoading } = usePublicProjects();

  const featured = useMemo(() => {
    const list = projects ?? [];
    const dated = list
      .map((project) => ({ project, timestamp: project.created_at ? new Date(project.created_at).getTime() : NaN }))
      .filter((item) => Number.isFinite(item.timestamp))
      .sort((a, b) => b.timestamp - a.timestamp);
    return dated[0]?.project ?? list[0];
  }, [projects]);

  const rest = useMemo(
    () => (projects ?? []).filter((project) => project.id !== featured?.id),
    [projects, featured?.id],
  );

  return (
    <div className="curiosity min-h-screen overflow-x-clip">
      <PlayNav />
      <main id="main-content">
        <PlayHero />
        <ConceptGallery />
        <BuildMethod />
        <BrowserArchive featured={featured} rest={rest} isLoading={isLoading} />
        <ClosingAbout />
      </main>
      <PlayFooter />
    </div>
  );
};

export default Index;
