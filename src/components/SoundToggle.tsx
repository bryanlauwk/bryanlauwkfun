import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useStrangerSFX();
  
  // Background music plays when sound is enabled
  const { isLoading } = useBackgroundMusic(soundEnabled);

  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded-sm border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group relative"
      aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
      ) : soundEnabled ? (
        <Volume2 className="w-4 h-4 text-primary animate-electrical-flicker" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
      
      {/* Loading indicator tooltip */}
      {isLoading && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
          Generating...
        </span>
      )}
    </button>
  );
}
