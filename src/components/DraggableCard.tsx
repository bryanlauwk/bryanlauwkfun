import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Star, Sparkles } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string | null;
  href: string;
  image_url: string | null;
  color: string;
}

interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

interface DraggableCardProps {
  project: Project;
  position: CardPosition;
  onDragEnd: (x: number, y: number) => void;
  onFocus: () => void;
  index: number;
}

const decorations = ["⭐", "✨", "💫", "🌟", "⚡", "🔥", "💥", "🎯"];

const cardBorders = [
  "border-primary",
  "border-secondary", 
  "border-accent",
  "border-destructive",
];

export function DraggableCard({
  project,
  position,
  onDragEnd,
  onFocus,
  index,
}: DraggableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [localPos, setLocalPos] = useState({ x: position.x, y: position.y });

  // Sync with external position
  useEffect(() => {
    if (!isDragging) {
      setLocalPos({ x: position.x, y: position.y });
    }
  }, [position.x, position.y, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    
    e.preventDefault();
    onFocus();
    setIsDragging(true);

    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const container = cardRef.current?.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newX = ((e.clientX - dragOffset.x - containerRect.left) / containerRect.width) * 100;
    const newY = ((e.clientY - dragOffset.y - containerRect.top) / containerRect.height) * 100;

    setLocalPos({
      x: Math.max(-15, Math.min(110, newX)),
      y: Math.max(-10, Math.min(100, newY)),
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(localPos.x, localPos.y);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const decoration = decorations[index % decorations.length];
  const borderClass = cardBorders[index % cardBorders.length];

  return (
    <div
      ref={cardRef}
      className={cn(
        "absolute w-[280px] md:w-[320px] transition-shadow duration-200",
        isDragging ? "cursor-grabbing scale-105" : "cursor-grab hover:scale-102",
        "select-none"
      )}
      style={{
        left: `${localPos.x}%`,
        top: `${localPos.y}%`,
        transform: `rotate(${position.rotation}deg)`,
        zIndex: position.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Decorative corner stars */}
      <span className="absolute -top-4 -left-4 text-2xl animate-star-spin">
        {decoration}
      </span>
      <span className="absolute -top-4 -right-4 text-2xl animate-star-spin" style={{ animationDelay: "0.5s" }}>
        {decoration}
      </span>

      {/* Main card */}
      <div
        className={cn(
          "bg-card border-4 p-4",
          borderClass,
          "shadow-[6px_6px_0_hsl(var(--foreground))]",
          isDragging && "shadow-[8px_8px_0_hsl(var(--foreground))]"
        )}
      >
        {/* Image area */}
        {project.image_url ? (
          <div className="relative h-40 overflow-hidden border-2 border-border mb-3">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 crt-effect" />
          </div>
        ) : (
          <div className="h-40 pattern-checkerboard border-2 border-border mb-3 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-primary animate-bounce-chaotic" />
          </div>
        )}

        {/* Title */}
        <h3 className="font-pixel text-lg text-foreground mb-2 leading-tight">
          <Star className="inline w-4 h-4 mr-1 text-accent" />
          {project.title}
        </h3>

        {/* Description */}
        {project.description && (
          <p className="font-fun text-sm text-muted-foreground mb-3 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Link button */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2",
            "bg-primary text-primary-foreground",
            "font-pixel text-sm",
            "border-2 border-foreground",
            "button-bevel",
            "hover:animate-wobble"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          Click Here!!
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* "NEW!" badge for first card */}
      {index === 0 && (
        <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground font-pixel text-xs px-2 py-1 rotate-12 animate-bounce-chaotic border-2 border-foreground">
          NEW!
        </div>
      )}
    </div>
  );
}
