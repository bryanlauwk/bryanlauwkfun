import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pixel: ["VT323", "monospace"],
        retro: ["Press Start 2P", "monospace"],
        fun: ["Comic Neue", "Comic Sans MS", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        rainbow: {
          "0%": { color: "hsl(0 100% 50%)" },
          "16%": { color: "hsl(30 100% 50%)" },
          "33%": { color: "hsl(60 100% 50%)" },
          "50%": { color: "hsl(120 100% 50%)" },
          "66%": { color: "hsl(200 100% 50%)" },
          "83%": { color: "hsl(280 100% 50%)" },
          "100%": { color: "hsl(0 100% 50%)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-chaotic": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(5deg)" },
          "50%": { transform: "translateY(-5px) rotate(-3deg)" },
          "75%": { transform: "translateY(-15px) rotate(-5deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "scale(0.8) rotate(-5deg)" },
          to: { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "star-spin": {
          from: { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          to: { transform: "rotate(360deg) scale(1)" },
        },
        dance: {
          "0%, 100%": { transform: "translateY(0) scaleX(1)" },
          "25%": { transform: "translateY(-15px) scaleX(-1)" },
          "50%": { transform: "translateY(0) scaleX(1)" },
          "75%": { transform: "translateY(-10px) scaleX(-1)" },
        },
        "cd-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "reel-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(20deg)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blink: "blink 1s step-end infinite",
        rainbow: "rainbow 3s linear infinite",
        marquee: "marquee 15s linear infinite",
        wobble: "wobble 0.5s ease-in-out infinite",
        "bounce-chaotic": "bounce-chaotic 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "star-spin": "star-spin 4s ease-in-out infinite",
        dance: "dance 1s ease-in-out infinite",
        "cd-spin": "cd-spin 3s linear infinite",
        "reel-spin": "reel-spin 2s linear infinite",
        "float-up": "float-up 3s ease-out infinite",
        float: "float 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
