/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '40rem',
        'md': '48rem',
        'lg': '64rem',
        'xl': '80rem',
        '2xl': '96rem',
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: [
          "clamp(1rem, 0.9643rem + 0.1786vw, 1.125rem)",
          { lineHeight: "1.75rem" },
        ],
        xl: [
          "clamp(1.125rem, 1.0893rem + 0.1786vw, 1.25rem)",
          { lineHeight: "2rem" },
        ],
        "2xl": [
          "clamp(1.25rem, 1.1786rem + 0.3571vw, 1.5rem)",
          { lineHeight: "2.25rem" },
        ],
        "3xl": [
          "clamp(1.375rem, 1.2679rem + 0.5357vw, 1.75rem)",
          { lineHeight: "2.25rem" },
        ],
        "4xl": [
          "clamp(1.5rem, 1.3571rem + 0.7143vw, 2rem)",
          { lineHeight: "2.5rem" },
        ],
        "5xl": [
          "clamp(1.625rem, 1.375rem + 1.25vw, 2.5rem)",
          { lineHeight: "1" },
        ],
        "6xl": [
          "clamp(1.75rem, 1.3929rem + 1.7857vw, 3rem)",
          { lineHeight: "1" },
        ],
        "7xl": [
          "clamp(2.4rem, 1.0268rem + 3.3036vw, 4rem)",
          { lineHeight: "1" },
        ],
        "8xl": [
          "clamp(1.875rem, 0.9821rem + 4.4643vw, 5rem)",
          { lineHeight: ".9" },
        ],
        "9xl": [
          "clamp(2rem, 0.8571rem + 5.7143vw, 6rem)",
          { lineHeight: ".9" },
        ],
        "10xl": [
          "clamp(2.125rem, 0.4464rem + 8.3929vw, 8rem)",
          { lineHeight: ".9" },
        ],
      },
      colors: {
        // MAIN PALETTE
        dominant_color_light: "#FFFFFF",
        secondary_color: "#202124",
        accent_color: "#4880FF",
        secondary_color_variant: "#E8EAED",
        tertiary_color: "#f4f4f4ec",

        // ACCENT COLOR PALETTE
        cherry_red_accent: "#E15A51",
        mint_accent: "#85E0A3",
        azure_light_blue_accent: "#8CC6E7",
        honey_yellow_accent: "#FFC700",
        lavender_accent: "#C7B9FF",

        // TEXT COLOR PALETTE
        white_text_color: "#FFFFFF",
        black_text_color: "#000000",
        gray_text_color: "#7A7A7A",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
