import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#061317",         // Deep background from logo canvas
          surface: "#0b2026",    // Card background
          surfaceHover: "#112e37",
          border: "#173f4a",     // Subtle glassmorphism borders
          primary: "#00E5C0",    // Electric Cyan circuit accent
          glow: "#00F2FE",       // Bright cyan glow tint
          text: "#F1F5F9",       // Primary white text
          muted: "#8BA3A9",      // Secondary tech gray-cyan text
        },
      },
      backgroundImage: {
        'circuit-grid': 'radial-gradient(circle, rgba(0, 229, 192, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
export default config;