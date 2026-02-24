import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        syro: {
          purple: "#7C3AED",
          blue: "#2563EB",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        soft2: "0 18px 60px rgba(0,0,0,0.08)",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
} satisfies Config;
