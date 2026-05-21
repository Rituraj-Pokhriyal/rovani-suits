import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF8",
        "cream-2": "#F5F3F0",
        "cream-3": "#EDE9E4",
        gold: "#C9A96E",
        "gold-dark": "#A68750",
        "gold-light": "#E8D5B0",
        charcoal: "#0A0A0A",
        "charcoal-2": "#1A1A18",
        "text-primary": "#2D2926",
        "text-secondary": "#5A534D",
        "text-muted": "#8B8680",
        border: "#E8E4DF",
        "border-dark": "#D4CFC9",
        surface: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #A68750 100%)",
        "fabric-pattern": "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(201,169,110,0.04) 2px, rgba(201,169,110,0.04) 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
