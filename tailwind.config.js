/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#202229",
        secundary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
