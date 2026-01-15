import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { DoodleBackground } from "@/components/DoodleBackground";
import { usePublicProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

// Placeholder projects to fill up to 9 cards
const placeholderProjects = [
  {
    id: "placeholder-1",
    title: "Coming Soon",
    description: "Something exciting is brewing...",
    href: "#",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    image_url: null,
  },
  {
    id: "placeholder-2",
    title: "Coming Soon",
    description: "Another cool thing...",
    href: "#",
    color: "bg-gradient-to-br from-violet-400 to-purple-500",
    image_url: null,
  },
  {
    id: "placeholder-3",
    title: "Coming Soon",
    description: "Work in progress...",
    href: "#",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    image_url: null,
  },
  {
    id: "placeholder-4",
    title: "Coming Soon",
    description: "Stay tuned...",
    href: "#",
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
    image_url: null,
  },
  {
    id: "placeholder-5",
    title: "Coming Soon",
    description: "Getting ready...",
    href: "#",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    image_url: null,
  },
  {
    id: "placeholder-6",
    title: "Coming Soon",
    description: "Almost there...",
    href: "#",
    color: "bg-gradient-to-br from-red-400 to-pink-500",
    image_url: null,
  },
  {
    id: "placeholder-7",
    title: "Coming Soon",
    description: "Something fun ahead...",
    href: "#",
    color: "bg-gradient-to-br from-indigo-400 to-blue-500",
    image_url: null,
  },
  {
    id: "placeholder-8",
    title: "Coming Soon",
    description: "Big things coming...",
    href: "#",
    color: "bg-gradient-to-br from-fuchsia-400 to-pink-500",
    image_url: null,
  },
  {
    id: "placeholder-9",
    title: "Coming Soon",
    description: "Watch this space...",
    href: "#",
    color: "bg-gradient-to-br from-lime-400 to-green-500",
    image_url: null,
  },
];

const MIN_CARDS = 9;

const Index = () => {
  const { data: projects, isLoading } = usePublicProjects();

  // Always show at least 9 cards: real projects first, then placeholders
  const realProjects = projects || [];
  const placeholdersNeeded = Math.max(0, MIN_CARDS - realProjects.length);
  const displayProjects = [
    ...realProjects.map(p => ({ ...p, isPlaceholder: false })),
    ...placeholderProjects.slice(0, placeholdersNeeded).map(p => ({ ...p, isPlaceholder: true })),
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <DoodleBackground />
      <Header />

      {/* Main content */}
      <main className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Project Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description || undefined}
                imageUrl={project.image_url || undefined}
                href={project.href}
                color={project.color}
                isPlaceholder={project.isPlaceholder}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
