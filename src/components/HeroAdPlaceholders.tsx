import { usePublicSponsors } from "@/hooks/useSponsors";
import { FloatingAdPlaceholder } from "@/components/FloatingAdPlaceholder";

const layout = [
  { left: "2%",  top: "35%", scale: 1.0,  opacity: 0.85, delay: "0s",    speed: "7s"  },
  { left: "75%", top: "6%",  scale: 0.7,  opacity: 0.65, delay: "1.5s",  speed: "6s"  },
  { left: "38%", top: "12%", scale: 0.45, opacity: 0.45, delay: "3s",    speed: "5.5s"},
  { left: "88%", top: "50%", scale: 0.35, opacity: 0.35, delay: "4.5s",  speed: "5s"  },
];

const mobileLayout = [
  { left: "5%",  top: "55%", scale: 0.55, opacity: 0.5,  delay: "0s",   speed: "6s" },
  { left: "70%", top: "10%", scale: 0.35, opacity: 0.35, delay: "2s",   speed: "5s" },
];

export function HeroAdPlaceholders() {
  const { data: sponsors } = usePublicSponsors();
  const placeholders = sponsors?.filter((s) => !s.logo_url) ?? [];

  if (placeholders.length === 0) return null;

  // Cycle sponsor names for up to 4 balloons
  const getName = (i: number) => placeholders[i % placeholders.length].name;
  const getId = (i: number) => `balloon-${i}`;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      {/* Desktop: 4 balloons at varying depth */}
      {layout.map((pos, i) => (
        <div
          key={getId(i)}
          className="absolute pointer-events-auto hidden md:block"
          style={{
            left: pos.left,
            top: pos.top,
            opacity: pos.opacity,
            animationDelay: pos.delay,
            animationDuration: pos.speed,
          }}
        >
          <FloatingAdPlaceholder name={getName(i)} scale={pos.scale} id={getId(i)} />
        </div>
      ))}
      {/* Mobile: 2 smaller balloons */}
      {mobileLayout.map((pos, i) => (
        <div
          key={`mobile-${i}`}
          className="absolute pointer-events-auto md:hidden"
          style={{
            left: pos.left,
            top: pos.top,
            opacity: pos.opacity,
            animationDelay: pos.delay,
            animationDuration: pos.speed,
          }}
        >
          <FloatingAdPlaceholder name={getName(i)} scale={pos.scale} id={`mobile-${i}`} />
        </div>
      ))}
    </div>
  );
}
