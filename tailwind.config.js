/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      "sm": { "max": "640px" },
      // => @media (min-width: 640px) { ... }
      "mdsm": "641px",
      // => @media (min-width: 768px) { ... }
      "md": "768px",
      // => @media (min-width: 768px) { ... }
      "lge": "960px",
      // => @media (min-width: 1024px) { ... }
      "lg": "1150px",
      // => @media (min-width: 1024px) { ... }
      "xl": "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      primary: "#0A2463",
      secondary: "#FB3640",
      white: "#ffffff",
      textcolor: "#5a5a5a",
    },
  },
  plugins: [],
};
