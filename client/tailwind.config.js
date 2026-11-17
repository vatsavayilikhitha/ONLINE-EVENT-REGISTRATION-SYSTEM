/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode Surfaces
        'dark-bg': '#121212',
        'dark-surface': '#1C1C1C',
        'dark-card': '#222222',
        'dark-border': '#2E2E2E',
        'dark-text': '#F8F7F3',
        'dark-muted': '#A8A29E',

        // Brand fallback aliases to prevent any invisible text
        brand: {
          50: '#FAF0ED',
          100: '#F8E4DE',
          200: '#F2C5BB',
          300: '#EAB2A5',
          400: '#E28673',
          500: '#D95D45',
          600: '#D95D45',
          700: '#B94734',
          800: '#993726',
          900: '#7E2C1E'
        },
        ivory: {
          DEFAULT: '#F8F7F3',
          dark: '#F3F1EC',
          light: '#FCFBF9'
        },
        charcoal: {
          DEFAULT: '#171717',
          light: '#262626',
          muted: '#404040'
        },
        'warm-gray': {
          DEFAULT: '#6B6B67',
          light: '#8C8C87',
          dark: '#4D4D4A'
        },
        'warm-border': '#E5E2DB',
        coral: {
          DEFAULT: '#D95D45',
          hover: '#B94734',
          deep: '#993726',
          soft: '#F8E4DE',
          50: '#FAF0ED',
          100: '#F8E4DE',
          200: '#F2C5BB',
          500: '#D95D45',
          600: '#B94734',
          700: '#993726',
        },
        forest: {
          DEFAULT: '#2F6B4F',
          soft: '#E6F0EB',
          dark: '#23523C'
        },
        'warm-amber': {
          DEFAULT: '#B7791F',
          soft: '#FEF3C7',
          dark: '#925F16'
        },
        'warm-red': {
          DEFAULT: '#C2413B',
          soft: '#FCEBEA',
          dark: '#9E322D'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
