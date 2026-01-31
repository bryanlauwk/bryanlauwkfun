import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

export function AudioVisualizer({ isPlaying, barCount = 5 }: AudioVisualizerProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className="flex items-end justify-center gap-0.5 h-4 w-6">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-0.5 bg-primary rounded-full transition-all duration-150 ${
            isPlaying ? "animate-audio-bar" : "h-1"
          }`}
          style={{
            animationDelay: isPlaying ? `${i * 100}ms` : "0ms",
            height: isPlaying ? undefined : "4px",
          }}
        />
      ))}
    </div>
  );
}
