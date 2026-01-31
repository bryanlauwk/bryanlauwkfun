import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useStrangerSFX();
  
  // Background music plays when sound is enabled
  const { isLoading, hasError } = useBackgroundMusic(soundEnabled);

  return (
    <div className="relative">
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-card/90 border border-border/50 rounded text-xs font-mono text-muted-foreground whitespace-nowrap animate-fade-in">
          Generating music...
        </div>
      )}
      
      {/* Error indicator */}
      {hasError && !isLoading && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-destructive/20 border border-destructive/50 rounded text-xs font-mono text-destructive whitespace-nowrap animate-fade-in">
          Music unavailable
        </div>
      )}
    </div>
  );
}
