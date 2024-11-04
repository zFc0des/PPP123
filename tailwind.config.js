/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0070f3',
        'brand-hover': '#0055b3',
      },
    },
  },
  plugins: [],
}
