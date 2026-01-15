import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main content */}
      <main className="container mx-auto px-4 pb-24">
        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="pb-8">
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                href={project.href}
                color={project.color}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
