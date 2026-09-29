/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stage: "#D1D1D1",  // page behind the road
        road: "#1E1E1E",
        trail: "#45DB7D",  // green strip left behind the car
        ink: "#111111",
        lime: "#DEF54F",
        sky: "#6AC9FF",
        graphite: "#333333",
        tangerine: "#FA7328",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
