module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6c5ce7',
          50: '#f4f2fe',
          100: '#ebe7fd',
          200: '#d6cdfb',
          300: '#b7a5f7',
          400: '#9576f1',
          500: '#6c5ce7',
          600: '#5a3fd8',
          700: '#4b31bd',
          800: '#3e2a99',
          900: '#35257a',
        },
        accent: {
          DEFAULT: '#00b894',
          light: '#55efc4',
        },
        ink: '#1e2130',
      },
      boxShadow: {
        glass: '0 8px 30px rgba(108, 92, 231, 0.10)',
        card: '0 2px 8px rgba(30, 33, 48, 0.06)',
        'card-hover': '0 12px 28px rgba(108, 92, 231, 0.18)',
        glow: '0 0 0 3px rgba(108, 92, 231, 0.15)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        blob: 'blob 10s infinite ease-in-out',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
