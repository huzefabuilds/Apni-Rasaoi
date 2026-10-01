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
        darkBg: {
          DEFAULT: '#0B0F19',
          card: '#131B2E',
          surface: '#1E293B',
          subtle: '#1C2640',
          well: '#0E1524',
          border: '#233252',
          hover: '#263558',
        },
        cream: {
          50: '#FFFDF8',
          100: '#FFF8E7',
          200: '#FAF1D8',
          300: '#F2E4C0',
          400: '#E5D3A3',
        },
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warmOrange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
        }
      }
    },
  },
  plugins: [],
}
