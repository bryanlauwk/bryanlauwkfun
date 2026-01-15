import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
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
];

const Index = () => {
  const { data: projects, isLoading } = usePublicProjects();

  const displayProjects = projects?.length ? projects : fallbackProjects;

  return (
    <div className="min-h-screen bg-background">
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
