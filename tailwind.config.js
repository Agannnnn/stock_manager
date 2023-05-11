/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3C486B",
        secondary: "#F0F0F0",
        warning: "#F9D949",
        alert: "#F45050",
      },
    },
  },
  plugins: [],
};
