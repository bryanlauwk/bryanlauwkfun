import { useState, useEffect, useRef, RefObject } from "react";

interface UseIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionReturn {
  ref: RefObject<HTMLDivElement>;
  isInView: boolean;
  hasBeenInView: boolean;
}

export function useIntersection(
  options: UseIntersectionOptions = {}
): UseIntersectionReturn {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          
          if (inView) {
            setHasBeenInView(true);
          }
          
          if (triggerOnce && hasBeenInView) {
            setIsInView(true);
            return;
          }
          
          setIsInView(inView);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

  return { ref, isInView, hasBeenInView };
}

// Stagger animation helper for children
export function useStaggeredIntersection(
  itemCount: number,
  options: UseIntersectionOptions = {}
) {
  const intersection = useIntersection(options);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (!intersection.isInView) {
      setVisibleItems(new Array(itemCount).fill(false));
      return;
    }

    // Stagger reveal each item
    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 100); // 100ms stagger
      
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [intersection.isInView, itemCount]);

  return {
    ...intersection,
    visibleItems,
  };
}
