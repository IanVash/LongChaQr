import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/server/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201C",
        leaf: "#2F6F56",
        "leaf-soft": "#DDEBE4",
        plum: "#8D4666",
        cream: "#FBF7EF",
        oat: "#EFE2D0",
        tea: "#C7D8A3"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 32, 28, 0.08)"
      },
      backgroundImage: {
        "paper-texture":
          "linear-gradient(135deg, rgba(47,111,86,0.08), rgba(141,70,102,0.08))"
      }
    }
  },
  plugins: []
};

export default config;
