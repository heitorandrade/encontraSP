import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 45px -24px rgba(15, 23, 42, 0.35)"
      },
      colors: {
        ink: "#19222c",
        mist: "#f6f2e8",
        sand: "#e4dac8",
        spruce: "#35524a",
        clay: "#c8754d",
        cloud: "#fbfaf7"
      }
    }
  },
  plugins: []
};

export default config;
