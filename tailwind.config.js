/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFDF8',
          100: '#FFF8E7', // Target cream background
          200: '#FAF1D8',
          300: '#F2E4C0',
          400: '#E5D3A3',
        },
        brand: {
          50: '#F3F8F2',
          100: '#E4F1E3',
          200: '#C7E2C5',
          300: '#A3D0A0',
          400: '#75B272',
          500: '#5C9E59',
          600: '#4F8A4C', // Target fresh green for buttons
          700: '#41733E',
          800: '#335C31',
          900: '#224021',
        },
        warmOrange: {
          50: '#FEF8F3',
          100: '#FDEEE3',
          200: '#FBD9C3',
          300: '#F8BE9A',
          400: '#F6B07E',
          500: '#F4A261', // Target warm orange for highlights
          600: '#E28A40',
          700: '#C77024',
          800: '#A65615',
        }
      }
    },
  },
  plugins: [],
}
