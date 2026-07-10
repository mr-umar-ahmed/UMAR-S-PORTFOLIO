/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F7F5F1", // Light: Warm Limestone
          dark: "#0D0C0F",    // Dark: Midnight Graphite
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#161519",
        },
        accent: {
          DEFAULT: "#D8471F", // Light: Burnt Orange
          dark: "#C6FF3A",    // Dark: Acid Green
        },
        muted: {
          DEFAULT: "#6B6A63",
          dark: "#8F8E89",
        },
      },
      fontFamily: {
        display: ["General Sans", "sans-serif"],
        body: ["Switzer", "sans-serif"],
      },
      animation: {
        "infinite-scroll-left": "infinite-scroll-left 40s linear infinite",
        "infinite-scroll-right": "infinite-scroll-right 40s linear infinite",
      },
      keyframes: {
        "infinite-scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "infinite-scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
