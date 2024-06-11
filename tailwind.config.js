/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "pacifico": ["Pacifico"],
      },
      colors: {
        backrgound: "hsla(var(--bg-default))",
        text: "hsla(var(--text))",
        sliders: "hsla(var(--slider-thumb))",
      }
    },
  },
  plugins: [],
}