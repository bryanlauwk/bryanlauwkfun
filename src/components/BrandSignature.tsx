import { cn } from "@/lib/utils";

interface BrandSignatureProps {
  compact?: boolean;
  className?: string;
}

export function BrandSignature({ compact = false, className }: BrandSignatureProps) {
  return (
    <span
      className={cn(
        "brand-portal-mark inline-flex shrink-0 select-none items-center text-foreground",
        compact ? "gap-0" : "gap-3.5",
        className
      )}
    >
      <span className={cn("inline-block shrink-0", compact ? "h-9 w-10" : "h-20 w-[5.5rem]")} aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 80 72" fill="none">
          <path
            d="M52 7H16C11 7 7 11 7 16V56C7 61 11 65 16 65H52C57 65 61 61 61 56V47M61 25V16C61 11 57 7 52 7Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M18 22V49H27M29 22L33 49L38 35L43 49L47 22M49 22V49M49 35L57 23M49 35L57 48"
            stroke="currentColor"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="70" cy="36" r="4.5" className="brand-portal-dot fill-primary" />
        </svg>
      </span>

      {!compact && (
        <span className="inline-flex min-w-0 flex-col" aria-hidden="true">
          <span className="whitespace-nowrap font-display text-lg font-black uppercase leading-none tracking-[-0.045em] text-foreground md:text-xl">
            <span>Bryan</span>
            <span className="ml-1.5">LWK</span>
          </span>
          <span className="mt-2 flex items-center gap-2">
            <span className="h-px w-5 bg-primary" />
            <span className="font-mono text-[7px] font-bold uppercase tracking-[0.3em] text-primary">
              Create
            </span>
          </span>
        </span>
      )}

      <span className="sr-only">Bryan LWK Create</span>
    </span>
  );
}
