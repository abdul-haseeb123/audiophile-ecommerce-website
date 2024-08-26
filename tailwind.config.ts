import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      beige: {
        dark: "#D87D4A",
        light: "#fbaf85",
      },
      charcoal: "#101010",
      white: {
        DEFAULT: "#ffffff",
        cloud: "#f1f1f1",
        almost: "#fafafa",
      },
      black: "#000000",
    },
    fontSize: {
      base: [
        "15px",
        {
          lineHeight: "25px",
          fontWeight: "500",
        },
      ],
      subtitle: [
        "13px",
        {
          lineHeight: "25px",
          letterSpacing: "1px",
          fontWeight: "700",
        },
      ],
      overline: [
        "14px",
        {
          lineHeight: "19px",
          letterSpacing: "10px",
          fontWeight: "400",
        },
      ],
      xl: [
        "18px",
        {
          lineHeight: "24px",
          letterSpacing: "1.3px",
          fontWeight: "700",
        },
      ],
      "2xl": [
        "24px",
        {
          lineHeight: "33px",
          letterSpacing: "1.7px",
          fontWeight: "700",
        },
      ],
      "3xl": [
        "28px",
        {
          lineHeight: "38px",
          letterSpacing: "2px",
          fontWeight: "700",
        },
      ],
      "4xl": [
        "32px",
        {
          lineHeight: "36px",
          letterSpacing: "1.15px",
          fontWeight: "700",
        },
      ],
      "5xl": [
        "40px",
        {
          lineHeight: "44px",
          letterSpacing: "1.5px",
          fontWeight: "700",
        },
      ],
      "6xl": [
        "56px",
        {
          lineHeight: "58px",
          letterSpacing: "2px",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      backgroundImage: {
        "hero-pattern-desktop": "url('/assets/home/desktop/image-hero.jpg')",
        "hero-pattern-tablet": "url('/assets/home/tablet/image-header.jpg')",
        "hero-pattern-mobile": "url('/assets/home/mobile/image-header.jpg')",
        "circle-pattern": "url('/assets/home/desktop/pattern-circles.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
