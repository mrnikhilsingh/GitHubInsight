/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(350px, 1fr))",
      },
    },
  },
  plugins: [],
};
