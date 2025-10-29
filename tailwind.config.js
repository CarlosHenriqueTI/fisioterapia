/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
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
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Dark mode specific colors
        dark: {
          bg: '#0F172A',
          bgSecondary: '#1E293B',
          bgTertiary: '#334155',
          text: '#F1F5F9',
          textSecondary: '#CBD5E1',
          border: '#334155',
        },
      },
      fontFamily: {
        'space-mono': ['SpaceMono-Regular'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
      },
    },
  },
  plugins: [],
}
