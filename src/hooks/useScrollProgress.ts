import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollProgress {
  progress: number; // 0-1 representing scroll position
  scrollY: number;
  direction: "up" | "down" | null;
  velocity: number;
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = maxScroll > 0 ? Math.min(currentScrollY / maxScroll, 1) : 0;
      
      // Calculate velocity
      const timeDelta = currentTime - lastTime.current;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const newVelocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta : 0;

      // Determine direction
      const newDirection = currentScrollY > lastScrollY.current ? "down" : 
                          currentScrollY < lastScrollY.current ? "up" : null;

      setProgress(newProgress);
      setScrollY(currentScrollY);
      setDirection(newDirection);
      setVelocity(newVelocity);

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    });
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { progress, scrollY, direction, velocity };
}

// Hook for tracking scroll within a specific section
export function useSectionProgress(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled through
      const start = viewportHeight; // When top of section hits bottom of viewport
      const end = -rect.height; // When bottom of section passes top of viewport
      const current = rect.top;
      
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setSectionProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { ref, isInView, sectionProgress };
}
