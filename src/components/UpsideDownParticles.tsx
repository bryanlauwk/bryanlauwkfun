import { useMemo } from "react";

type ParticleType = "ember" | "pixel" | "ash";

interface Particle {
  id: number;
  type: ParticleType;
  left: string;
  size: number;
  height: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  color: string;
  rounded: string;
}

const EMBER_COLORS = [
  "hsl(350 85% 55%)",  // primary crimson
  "hsl(350 90% 58%)",  // crimson variant
  "hsl(35 90% 55%)",   // amber warm
  "hsl(25 85% 50%)",   // deep amber
];

const PIXEL_COLORS = [
  "hsl(200 100% 60%)", // accent blue
  "hsl(200 100% 65%)", // lighter accent
  "hsl(220 80% 60%)",  // cool blue
];

const ASH_COLORS = [
  "hsl(45 20% 90%)",   // foreground tone
  "hsl(250 15% 55%)",  // muted
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function UpsideDownParticles() {
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];

    // 18 Embers — tiny glowing crimson/amber sparks
    for (let i = 0; i < 18; i++) {
      const s = 1 + Math.random() * 2; // 1-3px
      result.push({
        id: i,
        type: "ember",
        left: `${Math.random() * 100}%`,
        size: s,
        height: s,
        duration: 6 + Math.random() * 8, // 6-14s
        delay: Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.25, // 0.15-0.4
        drift: -50 + Math.random() * 100, // wide wander
        color: pickRandom(EMBER_COLORS),
        rounded: "rounded-full",
      });
    }

    // 10 Pixel Dust — tiny square digital fragments
    for (let i = 0; i < 10; i++) {
      const s = 2 + Math.random() * 2; // 2-4px
      result.push({
        id: 18 + i,
        type: "pixel",
        left: `${Math.random() * 100}%`,
        size: s,
        height: s,
        duration: 10 + Math.random() * 8, // 10-18s
        delay: Math.random() * 20,
        opacity: 0.08 + Math.random() * 0.12, // 0.08-0.2
        drift: -40 + Math.random() * 80,
        color: pickRandom(PIXEL_COLORS),
        rounded: "rounded-none", // square
      });
    }

    // 7 Ash / Debris — larger, slower elongated pieces
    for (let i = 0; i < 7; i++) {
      result.push({
        id: 28 + i,
        type: "ash",
        left: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 8, // 4-12px wide
        height: 1 + Math.random() * 2, // thin
        duration: 15 + Math.random() * 10, // 15-25s
        delay: Math.random() * 20,
        opacity: 0.05 + Math.random() * 0.1, // 0.05-0.15
        drift: -30 + Math.random() * 60,
        color: pickRandom(ASH_COLORS),
        rounded: "",
      });
    }

    return result;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.rounded} ${p.type === "ash" ? "animate-ash-float" : "animate-spore-float"}`}
          style={{
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.height,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spore-opacity" as string]: `${p.opacity}`,
            transform: p.type === "ash" ? `rotate(${Math.random() * 180}deg)` : undefined,
          }}
        />
      ))}
    </div>
  );
}
