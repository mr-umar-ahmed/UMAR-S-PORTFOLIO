/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080809",
        surface: "#0f1014",
        accent: "#C6FF3A", // Acid Green
        muted: "#8F939D",
        inactive: "#1E2024",
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
