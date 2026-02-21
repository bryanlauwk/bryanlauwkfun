import { useMemo } from "react";

interface Bubble {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  borderColor: string;
}

const BUBBLE_COLORS = [
  "hsl(40 80% 65%)",   // warm amber
  "hsl(45 70% 70%)",   // soft gold
  "hsl(350 60% 60%)",  // faint crimson
  "hsl(35 75% 60%)",   // deep amber
  "hsl(45 65% 75%)",   // pale gold
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function UpsideDownParticles() {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const size = 6 + Math.random() * 12; // 6-18px
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        duration: 10 + Math.random() * 12, // 10-22s
        delay: Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.3, // 0.2-0.5
        drift: -40 + Math.random() * 80,
        borderColor: pickRandom(BUBBLE_COLORS),
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-spore-float"
          style={{
            left: b.left,
            bottom: "-20px",
            width: b.size,
            height: b.size,
            backgroundColor: "transparent",
            border: `1px solid ${b.borderColor}`,
            boxShadow: `inset 2px -2px 4px ${b.borderColor.replace(")", " / 0.15)")}, 0 0 6px ${b.borderColor.replace(")", " / 0.1)")}`,
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
