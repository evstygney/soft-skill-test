import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f6f0e8",
        ivory: "#fbf8f3",
        ink: "#1d1d1b",
        mist: "#d7cfc2",
        sage: "#7f9178",
        clay: "#b9875b",
        pine: "#344138"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-fraunces)"]
      },
      boxShadow: {
        card: "0 24px 80px rgba(42, 33, 20, 0.08)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(185, 135, 91, 0.18), transparent 42%), radial-gradient(circle at bottom right, rgba(127, 145, 120, 0.16), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
