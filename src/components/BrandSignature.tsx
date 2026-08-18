import { cn } from "@/lib/utils";

interface BrandSignatureProps {
  compact?: boolean;
  className?: string;
}

export function BrandSignature({ compact = false, className }: BrandSignatureProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="contents" aria-hidden="true">
        <span
          className={cn(
            "relative flex shrink-0 items-center justify-center font-display font-black text-foreground",
            compact ? "h-8 w-7 text-xl" : "h-11 w-9 text-3xl"
          )}
        >
          B
          <span className="absolute left-0 right-1 top-0 h-px bg-primary" />
          <span className="absolute bottom-0 left-1 right-0 h-[2px] bg-primary" />
          <span className="absolute bottom-1 right-0 top-1 w-px origin-center rotate-[18deg] bg-primary/80" />
        </span>

        <span className="inline-flex min-w-0 flex-col">
          <span className="flex items-baseline whitespace-nowrap leading-none">
            <span
              className={cn(
                "handwritten inline-block -rotate-2 text-foreground",
                compact ? "text-[1.55rem]" : "text-[2.35rem] md:text-[2.75rem]"
              )}
            >
              Bryan
            </span>
            <span
              className={cn(
                "ml-1 font-display font-black uppercase tracking-[0.04em] text-foreground",
                compact ? "text-[0.72rem]" : "text-base md:text-lg"
              )}
            >
              LauWK
            </span>
          </span>

          <span className={cn("flex items-center gap-2", compact ? "mt-0" : "mt-0.5")}>
            <span className="h-px w-4 bg-primary" />
            <span
              className={cn(
                "font-mono font-bold uppercase text-primary",
                compact ? "text-[6px] tracking-[0.38em]" : "text-[8px] tracking-[0.45em]"
              )}
            >
              Create
            </span>
            <span className="h-px flex-1 bg-primary/45" />
          </span>
        </span>
      </span>

      <span className="sr-only">Bryan LauWK — Create</span>
    </span>
  );
}
