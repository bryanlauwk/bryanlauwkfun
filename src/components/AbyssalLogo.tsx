import { cn } from "@/lib/utils";

interface AbyssalLogoProps {
  className?: string;
}

export function AbyssalLogo({ className }: AbyssalLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground tracking-widest">
        bryanlauwk
        <span className="text-primary">.fun</span>
      </span>
    </div>
  );
}
