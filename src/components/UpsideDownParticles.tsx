import { useMemo } from "react";

interface Orb {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  color: string;
}

const ORB_COLORS = [
  "hsl(48 95% 60%)",   // Joy – warm golden yellow
  "hsl(210 70% 55%)",  // Sadness – soft blue
  "hsl(0 80% 50%)",    // Anger – fiery red
  "hsl(140 60% 45%)",  // Disgust – vivid green
  "hsl(270 60% 55%)",  // Fear – rich purple
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function UpsideDownParticles() {
  const orbs = useMemo<Orb[]>(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const size = 6 + Math.random() * 12;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.3,
        drift: -40 + Math.random() * 80,
        color: pickRandom(ORB_COLORS),
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {orbs.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-spore-float"
          style={{
            left: b.left,
            bottom: "-20px",
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            boxShadow: `inset 0 -3px 6px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.3), 0 0 12px ${b.color.replace(")", " / 0.5)")}, 0 0 24px ${b.color.replace(")", " / 0.25)")}`,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ["--drift" as string]: `${b.drift}px`,
            ["--spore-opacity" as string]: `${b.opacity}`,
          }}
        />
      ))}
    </div>
  );
}
