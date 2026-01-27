import { useState, useEffect } from "react";

interface Shape {
  id: string;
  type: "circle" | "ring" | "dot" | "cross";
  x: number;
  y: number;
  size: number;
  opacity: number;
}

// Minimal, refined geometric shapes - much less clutter
const shapes: Shape[] = [
  { id: "1", type: "circle", x: 5, y: 15, size: 60, opacity: 0.03 },
  { id: "2", type: "ring", x: 90, y: 10, size: 80, opacity: 0.04 },
  { id: "3", type: "dot", x: 15, y: 70, size: 8, opacity: 0.08 },
  { id: "4", type: "dot", x: 85, y: 60, size: 6, opacity: 0.06 },
  { id: "5", type: "cross", x: 80, y: 85, size: 20, opacity: 0.04 },
  { id: "6", type: "dot", x: 50, y: 90, size: 4, opacity: 0.05 },
];

const ShapeSVG = ({ type, opacity }: { type: Shape["type"]; opacity: number }) => {
  switch (type) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="hsl(var(--primary))" 
            opacity={opacity}
          />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            opacity={opacity}
          />
        </svg>
      );
    case "dot":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="50" 
            fill="hsl(var(--foreground))"
            opacity={opacity}
          />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50 20 L50 80 M20 50 L80 50" 
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={opacity}
          />
        </svg>
      );
    default:
      return null;
  }
};

export const DoodleBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => {
        // Subtle parallax
        const parallaxOffset = scrollY * 0.02;

        return (
          <div
            key={shape.id}
            className="absolute transition-transform duration-1000 ease-out"
            style={{
              left: `${shape.x}%`,
              top: `calc(${shape.y}% - ${parallaxOffset}px)`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          >
            <ShapeSVG type={shape.type} opacity={shape.opacity} />
          </div>
        );
      })}

      {/* Subtle gradient overlay at edges */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};
