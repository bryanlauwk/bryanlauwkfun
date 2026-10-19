import { bundledPublicProjects } from "@/data/public-projects";
import type { Project } from "@/hooks/useProjects";

export const categories = ["All", "Games", "Web experiences", "Objects"] as const;
export type StudioCategory = typeof categories[number];

const host = (href: string) => {
  try { return new URL(href).hostname.replace(/^www\./, ""); } catch { return ""; }
};
export function projectPresentation(project: Project) {
  const metadata = bundledPublicProjects.find(p => host(p.href) === host(project.href));
  const category = project.category ?? metadata?.category ?? "Web experiences";
  return {
    category,
    summary: metadata?.description ?? project.description ?? "An idea to explore.",
    action: category === "Games" ? "Play" : "Explore",
  };
}
export function readCategory(value: string | null): StudioCategory {
  return categories.find(c => c.toLowerCase().replace(/ /g, "-") === value) ?? "All";
}
export const categoryParam = (category: StudioCategory) => category.toLowerCase().replace(/ /g, "-");
