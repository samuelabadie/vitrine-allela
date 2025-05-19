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
        // Primary brand color with variations
        primary: {
          50: "#FFF1EB",
          100: "#FFE3D6",
          200: "#FFC7AD",
          300: "#FFAB85",
          400: "#FF8F5C",
          500: "#FF5300", // Base primary color
          600: "#CC4200",
          700: "#993200",
          800: "#662100",
          900: "#331000",
        },
        // Black color with variations
        black: {
          50: "#F5F5F5",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1E1E1E", // Base black color
        },
        // White color with variations
        white: {
          50: "#FFFFFF", // Base white color
          100: "#F2F2F2",
          200: "#E6E6E6",
          300: "#D9D9D9",
          400: "#CCCCCC",
          500: "#BFBFBF",
          600: "#B3B3B3",
          700: "#A6A6A6",
          800: "#999999",
          900: "#8C8C8C",
        },
      },
    },
  },
  plugins: [],
};

export default config; 