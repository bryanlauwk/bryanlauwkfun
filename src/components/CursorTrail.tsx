import { useState, useEffect, useCallback } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const trailEmojis = ["⭐", "✨", "💫", "🌟", "⚡", "💥"];

export function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check if device has touch (mobile) - disable trail
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsEnabled(false);
    }
  }, []);

  const addTrail = useCallback((x: number, y: number) => {
    // Only add trail if moved enough distance
    const distance = Math.sqrt(
      Math.pow(x - lastPosition.x, 2) + Math.pow(y - lastPosition.y, 2)
    );
    
    if (distance < 40) return;
    
    setLastPosition({ x, y });
    
    const newTrail: Trail = {
      id: idCounter,
      x,
      y,
      emoji: trailEmojis[Math.floor(Math.random() * trailEmojis.length)],
    };
    
    setIdCounter((prev) => prev + 1);
    setTrails((prev) => [...prev.slice(-12), newTrail]); // Keep max 12 trails
    
    // Remove trail after animation
    setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 600);
  }, [idCounter, lastPosition]);

  useEffect(() => {
    if (!isEnabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      addTrail(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [addTrail, isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((trail) => (
        <span
          key={trail.id}
          className="absolute text-lg"
          style={{
            left: trail.x,
            top: trail.y,
            transform: "translate(-50%, -50%)",
            animation: "trail-fade 0.6s ease-out forwards",
          }}
        >
          {trail.emoji}
        </span>
      ))}
      <style>{`
        @keyframes trail-fade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
