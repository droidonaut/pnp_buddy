/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#626f86',
        secondary: '#ffe8a0',
        green: '#90c290',
        orange: '#d77a61',
        gold: '#dca422',
        light: '#f7f1de'

      }
    },
  },
  plugins: [],
}

