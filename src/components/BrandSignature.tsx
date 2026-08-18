import { cn } from "@/lib/utils";

interface BrandSignatureProps {
  compact?: boolean;
  className?: string;
}

export function BrandSignature({ compact = false, className }: BrandSignatureProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 select-none",
        compact ? "h-10 w-[9.75rem]" : "h-[4.75rem] w-[17.5rem]",
        className
      )}
    >
      <span className="absolute inset-0" aria-hidden="true">
        <span
          className={cn(
            "handwritten raw-signature-ink absolute left-0 top-0 whitespace-nowrap font-bold leading-none text-foreground",
            compact
              ? "text-[2.05rem] tracking-[-0.075em]"
              : "text-[3.75rem] tracking-[-0.085em]"
          )}
        >
          Bryan
        </span>

        <span
          className={cn(
            "handwritten raw-signature-ink absolute whitespace-nowrap font-bold leading-none text-foreground",
            compact
              ? "left-[4.15rem] top-[0.16rem] text-[2rem] tracking-[-0.09em]"
              : "left-[7.5rem] top-[0.28rem] text-[3.65rem] tracking-[-0.1em]"
          )}
        >
          Lau
        </span>

        <span
          className={cn(
            "handwritten raw-signature-ink absolute -rotate-[8deg] whitespace-nowrap font-bold leading-none text-primary",
            compact
              ? "left-[7.15rem] top-0 text-[1.6rem] tracking-[-0.12em]"
              : "left-[13.05rem] top-[0.1rem] text-[2.85rem] tracking-[-0.13em]"
          )}
        >
          WK
        </span>

        <span
          className={cn(
            "handwritten absolute -rotate-[5deg] whitespace-nowrap font-bold leading-none text-primary",
            compact
              ? "bottom-[0.05rem] right-[0.2rem] text-[0.8rem] tracking-[-0.03em]"
              : "bottom-0 right-[0.5rem] text-[1.35rem] tracking-[-0.04em]"
          )}
        >
          create
        </span>

        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 280 76"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M7 56C49 63 100 61 141 55C167 51 188 48 209 50C225 52 226 61 215 65C202 70 182 65 188 58C194 50 228 50 270 55"
            stroke="currentColor"
            strokeWidth={compact ? 1.45 : 1.65}
            strokeLinecap="round"
            className="text-foreground/75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M223 35C235 28 250 29 258 37C264 44 254 49 246 45C239 41 244 34 260 31"
            stroke="currentColor"
            strokeWidth={compact ? 1.25 : 1.5}
            strokeLinecap="round"
            className="text-primary"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>

      <span className="sr-only">Bryan LauWK — Create</span>
    </span>
  );
}
