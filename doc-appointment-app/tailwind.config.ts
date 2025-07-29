import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        background: "#2B2B2B",
        foreground: "#FAFAFA",
        border: "#2C2C2C",
        input: "#27272A",
        ring: "#6366F1",
        card: "#18181B",
        "card-foreground": "#FAFAFA",
        popover: "#18181B",
        "popover-foreground": "#FAFAFA",
        primary: {
          DEFAULT: "#183B4E",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272A",
          foreground: "#D4D4D8",
        },
        muted: {
          DEFAULT: "rgb(15 23 42 / 0.8)",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#3F3F46",
          foreground: "#FAFAFA",
        },
        destructive: {
          DEFAULT: "#F87171",
          foreground: "#ffffff",
        },
        sidebar: {
          DEFAULT: "#18181B",
          foreground: "#FAFAFA",
          primary: {
            DEFAULT: "#6366F1",
            foreground: "#ffffff",
          },
          accent: {
            DEFAULT: "#27272A",
            foreground: "#D4D4D8",
          },
          border: "#3F3F46",
          ring: "#6366F1",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
