import { usePublicSponsors } from "@/hooks/useSponsors";
import { FloatingAdPlaceholder } from "@/components/FloatingAdPlaceholder";
import { useEffect, useRef, useState, useCallback } from "react";

const layout = [
  { left: "2%",  top: "30%", scale: 1.0,  opacity: 0.9, delay: "0s",   speed: "7s",   parallax: 0.15 },
  { left: "72%", top: "8%",  scale: 0.7,  opacity: 0.9, delay: "2s",   speed: "6s",   parallax: 0.2  },
  { left: "55%", top: "50%", scale: 0.45, opacity: 0.9, delay: "4s",   speed: "5.5s", parallax: 0.3  },
];

const mobileLayout = [
  { left: "5%",  top: "55%", scale: 0.7,  opacity: 0.9, delay: "0s", speed: "6s", parallax: 0.2 },
  { left: "70%", top: "10%", scale: 0.45, opacity: 0.9, delay: "2s", speed: "5s", parallax: 0.35 },
];

export function HeroAdPlaceholders() {
  const { data: sponsors } = usePublicSponsors();
  const placeholders = sponsors?.filter((s) => !s.logo_url) ?? [];
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  if (placeholders.length === 0) return null;

  const getText = (i: number) => placeholders[i % placeholders.length].balloon_text;
  const getId = (i: number) => `balloon-${i}`;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      {layout.map((pos, i) => (
        <div
          key={getId(i)}
          className="absolute pointer-events-auto hidden md:block will-change-transform"
          style={{
            left: pos.left,
            top: pos.top,
            opacity: pos.opacity,
            animationDelay: pos.delay,
            animationDuration: pos.speed,
            transform: `translateY(${-scrollY * pos.parallax}px)`,
          }}
        >
          <FloatingAdPlaceholder name={getText(i)} scale={pos.scale} id={getId(i)} />
        </div>
      ))}
      {mobileLayout.map((pos, i) => (
        <div
          key={`mobile-${i}`}
          className="absolute pointer-events-auto md:hidden will-change-transform"
          style={{
            left: pos.left,
            top: pos.top,
            opacity: pos.opacity,
            animationDelay: pos.delay,
            animationDuration: pos.speed,
            transform: `translateY(${-scrollY * pos.parallax}px)`,
          }}
        >
          <FloatingAdPlaceholder name={getText(i)} scale={pos.scale} id={`mobile-${i}`} />
        </div>
      ))}
    </div>
  );
}
