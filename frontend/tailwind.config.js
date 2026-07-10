/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Serif: ["Cormorant Garamond", "serif"],
      admin: ["DM Sans", "sans-serif"],
      mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        brand: "var(--color-brand)",
      },
    },
  },
  plugins: [],
};
