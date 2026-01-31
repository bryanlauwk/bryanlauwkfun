import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { AudioVisualizer } from "./AudioVisualizer";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useStrangerSFX();
  
  // Background music plays when sound is enabled
  const { isLoading, hasError, isPlaying } = useBackgroundMusic(soundEnabled);

  return (
    <div className="relative flex items-center gap-2">
      {/* Audio visualizer - shows when music is playing */}
      {isPlaying && !isLoading && (
        <AudioVisualizer isPlaying={isPlaying} barCount={5} />
      )}
      
      <button
        onClick={toggleSound}
        className="p-2 rounded-sm border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
        aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
        ) : soundEnabled ? (
          <Volume2 className="w-4 h-4 text-primary animate-electrical-flicker" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </button>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-card/90 border border-border/50 rounded text-xs font-mono text-muted-foreground whitespace-nowrap animate-fade-in">
          Loading music...
        </div>
      )}
      
      {/* Error indicator */}
      {hasError && !isLoading && (
        <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-destructive/20 border border-destructive/50 rounded text-xs font-mono text-destructive whitespace-nowrap animate-fade-in">
          Music unavailable
        </div>
      )}
    </div>
  );
}
