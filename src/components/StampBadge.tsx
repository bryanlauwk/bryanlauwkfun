import { cn } from "@/lib/utils";

interface StampBadgeProps {
  label: string;
  rotate?: number;
  className?: string;
}

export function StampBadge({ label, rotate = -6, className }: StampBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-primary px-3 py-1",
        "font-mono text-xs uppercase tracking-[0.2em] text-primary",
        "bg-background",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </span>
  );
}
