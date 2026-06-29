/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Serif: ["Cormorant Garamond", "serif"],
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
