/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: { 
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        'primaryPatient': '#329AFC',
      },
      backgroundImage: {
        'hero': "url('../public/images/background.png')",
      },

    },
  },
  plugins: [],
}
