import { ReactNode } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-scale" | "none";
  delay?: number;
  threshold?: number;
}

export function ScrollSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollSectionProps) {
  const { ref, isInView, hasBeenInView } = useIntersection({
    threshold,
    triggerOnce: true,
  });

  const animationClasses = {
    "fade-up": {
      initial: "opacity-0 translate-y-12",
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      initial: "opacity-0 translate-x-12",
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      initial: "opacity-0 -translate-x-12",
      visible: "opacity-100 translate-x-0",
    },
    "fade-scale": {
      initial: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    "none": {
      initial: "",
      visible: "",
    },
  };

  const currentAnimation = animationClasses[animation];
  const isVisible = hasBeenInView || isInView;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? currentAnimation.visible : currentAnimation.initial,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered children wrapper
interface StaggeredRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggeredReveal({
  children,
  className,
  staggerDelay = 100,
  threshold = 0.1,
}: StaggeredRevealProps) {
  const { ref, hasBeenInView } = useIntersection({
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-700 ease-out",
            hasBeenInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          style={{
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
