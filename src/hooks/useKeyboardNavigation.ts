import { useState, useEffect, useCallback } from "react";
import { useStrangerSFX } from "./useStrangerSFX";

interface UseKeyboardNavigationProps {
  itemCount: number;
  columns?: number;
  onSelect?: (index: number) => void;
}

export function useKeyboardNavigation({
  itemCount,
  columns = 3,
  onSelect,
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { playElectricalCrackle, playPowerSurge } = useStrangerSFX();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (itemCount === 0) return;

      const currentIndex = focusedIndex ?? -1;
      let newIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          if (currentIndex === -1) {
            newIndex = 0;
          } else if (currentIndex < itemCount - 1) {
            newIndex = currentIndex + 1;
          }
          break;

        case "ArrowLeft":
          event.preventDefault();
          if (currentIndex === -1) {
            newIndex = 0;
          } else if (currentIndex > 0) {
            newIndex = currentIndex - 1;
          }
          break;

        case "ArrowDown":
          event.preventDefault();
          if (currentIndex === -1) {
            newIndex = 0;
          } else if (currentIndex + columns < itemCount) {
            newIndex = currentIndex + columns;
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          if (currentIndex === -1) {
            newIndex = 0;
          } else if (currentIndex - columns >= 0) {
            newIndex = currentIndex - columns;
          }
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex !== null && onSelect) {
            playPowerSurge();
            onSelect(focusedIndex);
          }
          return;

        case "Escape":
          setFocusedIndex(null);
          return;

        default:
          return;
      }

      if (newIndex !== null && newIndex !== focusedIndex) {
        setFocusedIndex(newIndex);
        playElectricalCrackle();
      }
    },
    [focusedIndex, itemCount, columns, onSelect, playElectricalCrackle, playPowerSurge]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const resetFocus = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  return {
    focusedIndex,
    setFocusedIndex,
    resetFocus,
  };
}
