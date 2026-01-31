import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface UpsideDownContextType {
  isUpsideDown: boolean;
  toggleUpsideDown: () => void;
  activateUpsideDown: () => void;
}

const UpsideDownContext = createContext<UpsideDownContextType | undefined>(undefined);

export function UpsideDownProvider({ children }: { children: ReactNode }) {
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  const toggleUpsideDown = useCallback(() => {
    setIsUpsideDown((prev) => !prev);
  }, []);

  const activateUpsideDown = useCallback(() => {
    setIsUpsideDown(true);
  }, []);

  return (
    <UpsideDownContext.Provider value={{ isUpsideDown, toggleUpsideDown, activateUpsideDown }}>
      {children}
    </UpsideDownContext.Provider>
  );
}

export function useUpsideDown() {
  const context = useContext(UpsideDownContext);
  if (!context) {
    throw new Error("useUpsideDown must be used within UpsideDownProvider");
  }
  return context;
}
