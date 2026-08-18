import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BrandSignatureProps {
  compact?: boolean;
  className?: string;
}

export function BrandSignature({ compact = false, className }: BrandSignatureProps) {
  const dotStyle = {
    "--brand-dot-from": compact ? "-14px" : "-133px",
    "--brand-dot-duration": compact ? "850ms" : "1050ms",
  } as CSSProperties;

  return (
    <span
      className={cn(
        "brand-portal-mark relative inline-flex shrink-0 select-none items-center text-foreground",
        compact ? "gap-0" : "gap-2",
        className
      )}
    >
      <span className={cn("inline-block shrink-0", compact ? "h-10 w-10" : "h-20 w-20")} aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 80 80" fill="none">
          <path
            d="M24 59C15 53 10 45 10 35C10 19 22 7 38 7C51 7 61 15 64 27M64 40C62 49 57 54 51 58V64H25V58"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M19 24V50H27M29 24L33 50L38 36L43 50L47 24M49 24V50M49 36L57 25M49 36L57 49"
            stroke="currentColor"
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M28 72H48"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {!compact && (
        <span className="inline-flex min-w-0 flex-col" aria-hidden="true">
          <span className="whitespace-nowrap font-display text-lg font-black uppercase leading-none tracking-[-0.045em] text-foreground md:text-xl">
            <span>Bryan</span>
            <span className="ml-1.5">Lau</span>
          </span>
          <span className="mt-2 font-mono text-[7px] font-bold uppercase tracking-[0.3em] text-primary">
            Create
          </span>
        </span>
      )}

      {!compact && (
        <span
          className="pointer-events-none absolute left-[3.75rem] top-10 h-px w-[8.5rem] bg-primary/80"
          aria-hidden="true"
        />
      )}

      <span
        className={cn(
          "brand-portal-dot pointer-events-none absolute z-10 rounded-full bg-primary",
          compact ? "left-[2.35rem] top-4 h-2 w-2" : "left-[11.75rem] top-[2.2rem] h-2.5 w-2.5"
        )}
        style={dotStyle}
        aria-hidden="true"
      />

      <span className="sr-only">Bryan Lau Create</span>
    </span>
  );
}
