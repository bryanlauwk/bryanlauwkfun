export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
  color: string;
}

// Placeholder projects - replace href with actual URLs and add custom illustrations
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Coming Soon",
    description: "Something exciting is brewing...",
    href: "#",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  {
    id: "project-2",
    title: "Coming Soon",
    description: "Another cool thing...",
    href: "#",
    color: "bg-gradient-to-br from-violet-400 to-purple-500",
  },
  {
    id: "project-3",
    title: "Coming Soon",
    description: "Work in progress...",
    href: "#",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
  },
  {
    id: "project-4",
    title: "Coming Soon",
    description: "Stay tuned...",
    href: "#",
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  {
    id: "project-5",
    title: "Coming Soon",
    description: "Getting ready...",
    href: "#",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: "project-6",
    title: "Coming Soon",
    description: "Almost there...",
    href: "#",
    color: "bg-gradient-to-br from-red-400 to-pink-500",
  },
];
