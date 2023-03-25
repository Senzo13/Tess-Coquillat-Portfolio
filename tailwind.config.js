/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    // Excluding slider.js in the index directory:
    // "!./src/components/index/carroussel",
  ],
  theme: {
    extend: {
      scale: {
        180: "1.8",
        200: "2",
      },
    },
  },
  plugins: [],
};
