import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Parallel Dimensions design tokens (monochrome only) ---
        void: "#0A0A0B",     // primary background
        iron: "#18181B",     // card / raised surface
        static: "#2A2B2F",   // hairline borders, dividers
        ash: "#8A8D93",      // muted / secondary text
        silver: "#C6C9CE",   // accent, links, active states
        bone: "#F3F2EE",     // primary text / paper-white
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(3px,-2px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
