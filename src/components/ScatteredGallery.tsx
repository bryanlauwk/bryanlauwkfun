import { useState, useEffect, useCallback, useRef } from "react";
import { usePublicProjects } from "@/hooks/useProjects";
import { DraggableCard } from "./DraggableCard";
import { Loader2 } from "lucide-react";

interface CardPosition {
  id: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

// Generate random scattered positions
function generateScatteredPositions(count: number): Omit<CardPosition, "id">[] {
  const positions: Omit<CardPosition, "id">[] = [];
  
  for (let i = 0; i < count; i++) {
    // Scatter across the viewport with some padding
    const x = 10 + Math.random() * 60; // 10-70% from left
    const y = 20 + Math.random() * 50; // 20-70% from top
    const rotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees
    const zIndex = Math.floor(Math.random() * 10);
    
    positions.push({ x, y, rotation, zIndex });
  }
  
  return positions;
}

export function ScatteredGallery() {
  const { data: projects, isLoading } = usePublicProjects();
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const [topZIndex, setTopZIndex] = useState(100);
  const initializedRef = useRef(false);

  // Initialize positions only ONCE when projects first load
  useEffect(() => {
    if (projects && projects.length > 0 && !initializedRef.current) {
      initializedRef.current = true;
      const basePositions = generateScatteredPositions(projects.length);
      setCardPositions(
        projects.map((project, index) => ({
          id: project.id,
          ...basePositions[index],
        }))
      );
    }
  }, [projects]);

  // Bring card to front on drag/click
  const bringToFront = useCallback((id: string) => {
    setTopZIndex((prev) => prev + 1);
    setCardPositions((prev) =>
      prev.map((pos) =>
        pos.id === id ? { ...pos, zIndex: topZIndex + 1 } : pos
      )
    );
  }, [topZIndex]);

  // Update position after drag
  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setCardPositions((prev) =>
      prev.map((pos) => (pos.id === id ? { ...pos, x, y } : pos))
    );
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <span className="ml-4 font-pixel text-xl text-foreground animate-blink">
          Loading...
        </span>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center border-chunky bg-card p-8">
          <p className="font-pixel text-2xl text-foreground animate-rainbow">
            🚧 Under Construction 🚧
          </p>
          <p className="mt-4 font-fun text-lg text-muted-foreground">
            No projects yet... check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] w-full overflow-visible">
      {projects.map((project, index) => {
        const position = cardPositions.find((p) => p.id === project.id);
        if (!position) return null;

        return (
          <DraggableCard
            key={project.id}
            project={project}
            position={position}
            onDragEnd={(x, y) => updatePosition(project.id, x, y)}
            onFocus={() => bringToFront(project.id)}
            index={index}
          />
        );
      })}
    </div>
  );
}
