import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { DoodleBackground } from "@/components/DoodleBackground";
import { usePublicProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

// Fallback static projects when database is empty
const fallbackProjects = [
  {
    id: "1",
    title: "Coming Soon",
    description: "Something exciting is brewing...",
    href: "#",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    image_url: null,
  },
  {
    id: "2",
    title: "Coming Soon",
    description: "Another cool thing...",
    href: "#",
    color: "bg-gradient-to-br from-violet-400 to-purple-500",
    image_url: null,
  },
  {
    id: "3",
    title: "Coming Soon",
    description: "Work in progress...",
    href: "#",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    image_url: null,
  },
  {
    id: "4",
    title: "Coming Soon",
    description: "Stay tuned...",
    href: "#",
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
    image_url: null,
  },
  {
    id: "5",
    title: "Coming Soon",
    description: "Getting ready...",
    href: "#",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    image_url: null,
  },
  {
    id: "6",
    title: "Coming Soon",
    description: "Almost there...",
    href: "#",
    color: "bg-gradient-to-br from-red-400 to-pink-500",
    image_url: null,
  },
  {
    id: "7",
    title: "Coming Soon",
    description: "Something fun ahead...",
    href: "#",
    color: "bg-gradient-to-br from-indigo-400 to-blue-500",
    image_url: null,
  },
  {
    id: "8",
    title: "Coming Soon",
    description: "Big things coming...",
    href: "#",
    color: "bg-gradient-to-br from-fuchsia-400 to-pink-500",
    image_url: null,
  },
  {
    id: "9",
    title: "Coming Soon",
    description: "Watch this space...",
    href: "#",
    color: "bg-gradient-to-br from-lime-400 to-green-500",
    image_url: null,
  },
];

const Index = () => {
  const { data: projects, isLoading } = usePublicProjects();

  const displayProjects = projects?.length ? projects : fallbackProjects;

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
