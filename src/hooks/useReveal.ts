import { useEffect, useRef, useState } from "react";

/**
 * Small IntersectionObserver helper used for scroll-entry choreography.
 * Fires once, then disconnects. Reduced-motion users start already revealed.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    // The target may mount later (e.g. after a loading state) — retry shortly.
    if (!el) {
      const id = window.setTimeout(() => setTick((n) => n + 1), 120);
      return () => window.clearTimeout(id);
    }

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, tick]);

  return { ref, inView } as const;
}
