import { Volume2, VolumeX } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useStrangerSFX();

  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded-sm border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
      aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-primary animate-electrical-flicker" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
    </button>
  );
}
