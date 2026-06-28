import { ReactNode } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { cn } from "@/lib/utils";

interface RedactionRevealProps {
  children: ReactNode;
  className?: string;
}

// Black bar that slides away to reveal the wrapped copy once scrolled into view
export function RedactionReveal({ children, className }: RedactionRevealProps) {
  const { ref, hasBeenInView } = useIntersection({ threshold: 0.4, triggerOnce: true });

  return (
    <span ref={ref} className={cn("redaction-bar-wrap", className)}>
      {children}
      <span className={cn("redaction-bar", hasBeenInView && "is-revealed")} aria-hidden="true" />
    </span>
  );
}

interface MarkerUnderlineProps {
  children: ReactNode;
  className?: string;
}

// Lime marker-stroke underline that draws in once scrolled into view
export function MarkerUnderline({ children, className }: MarkerUnderlineProps) {
  const { ref, hasBeenInView } = useIntersection({ threshold: 0.4, triggerOnce: true });

  return (
    <span
      ref={ref}
      className={cn("marker-underline", hasBeenInView && "is-revealed", className)}
    >
      {children}
    </span>
  );
}
