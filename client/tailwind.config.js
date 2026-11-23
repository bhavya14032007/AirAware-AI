/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7e927e',
          500: '#647764',
          600: '#4e5e4e',
          700: '#404c40',
          800: '#353e35',
          900: '#2c332c',
        },
        aqi: {
          good: '#10b981',      // 0-50
          moderate: '#f59e0b',  // 51-100
          unhealthySensitive: '#f97316', // 101-150
          unhealthy: '#ef4444', // 151-200
          veryUnhealthy: '#8b5cf6', // 201-300
          hazardous: '#881337', // 300+
        }
      },
      spacing: {
        'grid-1': '8px',
        'grid-2': '16px',
        'grid-3': '24px',
        'grid-4': '32px',
        'grid-5': '40px',
        'grid-6': '48px',
        'grid-8': '64px',
      }
    },
  },
  plugins: [],
}
