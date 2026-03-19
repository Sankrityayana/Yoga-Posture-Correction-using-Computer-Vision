/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#fff0dc',
          200: '#ffd8a8',
          300: '#ffb870',
          400: '#ff9130',
          500: '#f97316',
          600: '#ea6508',
          700: '#c2490a',
          800: '#9a3a10',
          900: '#7c3212',
        },
        indigo: {
          900: '#1e1b4b',
          800: '#2e2a6b',
          700: '#3730a3',
        },
        chakra: {
          purple: '#6d28d9',
          teal: '#0d9488',
          gold: '#d97706',
          rose: '#e11d48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'score-ring': 'scoreRing 1s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.8)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'radial-saffron': 'radial-gradient(circle at center, #f97316 0%, transparent 70%)',
        'gradient-iks': 'linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
}
