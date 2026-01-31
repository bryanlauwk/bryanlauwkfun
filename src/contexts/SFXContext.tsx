import { createContext, useContext, ReactNode } from "react";
import { useRetroSFX } from "@/hooks/useRetroSFX";

type SFXContextType = ReturnType<typeof useRetroSFX>;

const SFXContext = createContext<SFXContextType | null>(null);

export function SFXProvider({ children }: { children: ReactNode }) {
  const sfx = useRetroSFX();
  return <SFXContext.Provider value={sfx}>{children}</SFXContext.Provider>;
}

export function useSFX() {
  const context = useContext(SFXContext);
  if (!context) {
    throw new Error("useSFX must be used within a SFXProvider");
  }
  return context;
}
