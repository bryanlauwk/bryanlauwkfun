import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex items-center gap-2 border border-foreground/25 bg-transparent px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span className="hidden sm:inline">{isDark ? "Lights on" : "Lights off"}</span>
    </button>
  );
}
