module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for classes used in JS/JSX/TS/TSX files
    "./public/index.html", // Look for classes used in the HTML file
  ],
  darkMode: "media",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
