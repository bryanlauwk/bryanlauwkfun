import { useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export function UpsideDownParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.4,
      drift: -30 + Math.random() * 60,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-muted-foreground animate-spore-float"
          style={{
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
      
      {/* Larger, slower "ash" particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`ash-${i}`}
          className="absolute bg-muted-foreground/20 animate-ash-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-30px",
            width: 4 + Math.random() * 8,
            height: 1 + Math.random() * 2,
            transform: `rotate(${Math.random() * 180}deg)`,
            animationDuration: `${12 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 15}s`,
          }}
        />
      ))}
    </div>
  );
}
