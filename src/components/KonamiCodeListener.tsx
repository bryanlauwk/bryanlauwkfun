import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useUpsideDown } from "@/contexts/UpsideDownContext";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useCallback } from "react";

export function KonamiCodeListener() {
  const { toggleUpsideDown } = useUpsideDown();
  const { playPowerSurge } = useStrangerSFX();

  const handleKonamiActivate = useCallback(() => {
    // Play a power surge sound when activated
    playPowerSurge();
    toggleUpsideDown();
    console.log("🔮 Konami code activated - Welcome to the Upside Down!");
  }, [toggleUpsideDown, playPowerSurge]);

  useKonamiCode(handleKonamiActivate);

  return null;
}
