import { useState, useEffect } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  showOnlyOnScroll?: boolean;
}

export function ScrollProgress({ className, showOnlyOnScroll = true }: ScrollProgressProps) {
  const { progress, direction } = useScrollProgress();
  const [visible, setVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showOnlyOnScroll) {
      setVisible(true);
      return;
    }

    // Show on scroll
    if (direction !== null) {
      setVisible(true);
      
      // Clear existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      // Hide after 2 seconds of no scrolling
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 2000);
      
      setHideTimeout(timeout);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [direction, showOnlyOnScroll]);

  // Calculate percentage
  const percentage = Math.round(progress * 100);

  return (
    <div
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Vertical progress bar */}
      <div className="relative h-32 w-1 bg-border/30 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 bg-primary/60 rounded-full transition-all duration-100 ease-out"
          style={{ height: `${percentage}%` }}
        />
      </div>

      {/* Progress dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col justify-between py-1">
        {[0, 0.25, 0.5, 0.75, 1].map((position, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200 -ml-0.5",
              progress >= position
                ? "bg-primary scale-100"
                : "bg-border scale-75"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Horizontal progress bar (alternative style)
export function HorizontalScrollProgress({ className }: { className?: string }) {
  const { progress } = useScrollProgress();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-0.5 bg-border/20 z-50",
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
