/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
    screens: {
      laptop: "1150px",
      tablet: "768px",
      mobile: "599px",
      small: "399px",
    },
  },
  plugins: [],
};
