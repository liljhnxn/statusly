import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#09090c",
          900: "#0f0f14",
          850: "#13131b",
          800: "#181824",
          750: "#1d1d2c",
          700: "#242436",
          600: "#323249",
        },
        accent: {
          purple: {
            DEFAULT: "#8b5cf6",
            light: "#a78bfa",
            muted: "#4c1d95",
            subtle: "rgba(139, 92, 246, 0.12)",
          },
          green: {
            DEFAULT: "#10b981",
            light: "#34d399",
            muted: "#064e3b",
            subtle: "rgba(16, 185, 129, 0.12)",
          },
        },
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.25s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

