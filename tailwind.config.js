/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Background
      background: "#F5F5F5",
      onBackground: "#333333",
      // Primary
      primary: "#003366",
      onPrimary: "#FFFFFF",
      // Secondary
      secondary: "#006400",
      onSecondary: "#FFFFF0",
      // Tertiary
      tertiary: "#FFD700",
      onTertiary: "#000000",
      // Danger
      danger: "#DC143C",
      onDanger: "#FFFFFF",
      // Information
      info: "#87CEEB",
      onInfo: "#000000",
      // Warning
      warning: "#FFA500",
      onWarning: "#000000",

      // Miscellaneous
      transparent: "transparent",
    },
    extend: {
      borderRadius: {
        base: "0.25rem",
      },
      container: {
        center: true,
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
      fontFamily: {
        sans: "var(--font-inter), sans-serif",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
