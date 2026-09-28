import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090C10",
        surface: "#0F141C",
        "surface-dark": "#0B0E14",
        border: "#1B2433",
        "border-glow": "#00E599",
        accent: {
          DEFAULT: "#00E599",
          hover: "#00C882",
          muted: "rgba(0, 229, 153, 0.15)",
          glow: "rgba(0, 229, 153, 0.4)",
        },
        muted: {
          DEFAULT: "#94A3B8",
          dark: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 229, 153, 0.25)",
        "glow-lg": "0 0 50px rgba(0, 229, 153, 0.35)",
        "glow-card": "0 0 30px rgba(0, 229, 153, 0.15)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        float: "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
