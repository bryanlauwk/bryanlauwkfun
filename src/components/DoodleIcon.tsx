import { cn } from "@/lib/utils";

type DoodleIconType = "wave" | "target" | "coffee" | "sparkle";

interface DoodleIconProps {
  type: DoodleIconType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const DoodleIcon = ({ type, className, size = "md" }: DoodleIconProps) => {
  const baseClass = cn(sizeClasses[size], "inline-block", className);

  switch (type) {
    case "wave":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Waving stick figure hand */}
          <path
            d="M12 4C12 4 14 3 15 4C16 5 16 7 15 8L14 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 10C14 10 16 9 17 10C18 11 18 13 17 14L15 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 8C10 8 12 7 13 8C14 9 13 11 12 12L10 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10C8 10 6 11 6 13C6 15 8 17 10 18L14 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Motion lines */}
          <path d="M18 6L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M19 9L21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "target":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bullseye target doodle */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          {/* Arrow hitting target */}
          <path d="M19 5L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 5L19 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "coffee":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coffee cup doodle */}
          <path
            d="M5 10H15V18C15 19.5 13.5 21 12 21H8C6.5 21 5 19.5 5 18V10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Handle */}
          <path
            d="M15 12H17C18.5 12 19 13 19 14C19 15 18.5 16 17 16H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Steam lines */}
          <path d="M7 7C7 6 8 5 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M10 6C10 5 11 4 11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M13 7C13 6 14 5 14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" className={baseClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main sparkle star */}
          <path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Small accent sparkles */}
          <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="5" cy="18" r="1" fill="currentColor" opacity="0.5" />
          <circle cx="20" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
        </svg>
      );

    default:
      return null;
  }
};
