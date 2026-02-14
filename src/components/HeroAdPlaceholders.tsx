import { usePublicSponsors } from "@/hooks/useSponsors";
import { FloatingAdPlaceholder } from "@/components/FloatingAdPlaceholder";

const positions = [
  { left: "8%", top: "12%", delay: "0s" },
  { left: "62%", top: "22%", delay: "2s" },
  { left: "32%", top: "6%", delay: "4s" },
];

const mobilePositions = [
  { left: "5%", top: "18%", delay: "0s" },
  { left: "60%", top: "28%", delay: "2s" },
  { left: "30%", top: "8%", delay: "4s" },
];

export function HeroAdPlaceholders() {
  const { data: sponsors } = usePublicSponsors();
  const placeholders = sponsors?.filter((s) => !s.logo_url) ?? [];

  if (placeholders.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      {placeholders.slice(0, 3).map((sponsor, i) => {
        const pos = positions[i] ?? positions[0];
        const mPos = mobilePositions[i] ?? mobilePositions[0];
        return (
          <div
            key={sponsor.id}
            className="absolute pointer-events-auto hidden md:block"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: pos.delay,
            }}
          >
            <FloatingAdPlaceholder name={sponsor.name} variant={i} />
          </div>
        );
      })}
      {/* Mobile: only show first placeholder to avoid clutter */}
      {placeholders[0] && (
        <div
          className="absolute pointer-events-auto md:hidden"
          style={{
            left: mobilePositions[0].left,
            top: mobilePositions[0].top,
          }}
        >
          <FloatingAdPlaceholder name={placeholders[0].name} variant={0} />
        </div>
      )}
    </div>
  );
}
