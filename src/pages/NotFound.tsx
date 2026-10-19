import { StudioState } from "@/components/StudioChrome";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({ title: "Page not found — 881230.studio", description: "Find your way back to the games, web experiences and objects by Bryan Lau Wai Kit.", canonical: "https://www.bryanlauwk.fun/404", noindex: true });
  return <StudioState title="A curious dead end."><p>This page doesn’t exist. There’s plenty more to explore.</p></StudioState>;
}
