/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      border: {
        'border0': '1px',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/components/image/bg.jpg')",
      }
    },
  },
  plugins: [],
}
