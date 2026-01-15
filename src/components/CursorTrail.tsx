import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = [
  "hsl(340 82% 52%)", // primary
  "hsl(190 80% 50%)", // accent
  "hsl(48 100% 67%)", // yellow
  "hsl(0 100% 71%)",  // coral
];

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check if device has touch (mobile) - disable trail
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsEnabled(false);
      return;
    }

    let particleId = 0;
    let lastX = 0;
    let lastY = 0;
    let throttle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      throttle++;
      if (throttle % 3 !== 0) return; // Throttle for performance
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );
      
      if (distance < 10) return; // Only create particles when moving fast enough
      
      lastX = e.clientX;
      lastY = e.clientY;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 150);

    return () => clearTimeout(timer);
  }, [particles]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / particles.length * 0.7,
            transition: "opacity 0.15s ease-out",
          }}
        />
      ))}
    </div>
  );
}
