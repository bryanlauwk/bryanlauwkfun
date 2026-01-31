import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ImmersiveBackground() {
  const { scrollY } = useScrollProgress();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep teal gradient background matching illustration */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            hsl(var(--background)) 0%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      {/* Subtle ambient glow effects */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full opacity-10"
        style={{
          background: `radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.3) 0%,
            transparent 70%
          )`,
          transform: `translateY(${-scrollY * 0.1}px)`,
        }}
      />
      
      <div 
        className="absolute top-2/3 right-1/4 w-[500px] h-[300px] rounded-full opacity-10"
        style={{
          background: `radial-gradient(
            ellipse at center,
            hsl(var(--accent) / 0.2) 0%,
            transparent 70%
          )`,
          transform: `translateY(${-scrollY * 0.15}px)`,
        }}
      />

      {/* Top fade overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
