/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#eef2ff',
          200: '#dfe7ff',
          300: '#c7d2fe',
          400: '#8ca3ff',
          500: '#5f7cff',
          600: '#4059db',
          700: '#3347b6',
          800: '#293990',
          900: '#202d71',
        },
      },
      boxShadow: {
        glow: '0 20px 40px -12px rgba(64, 89, 219, 0.35)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at 10% 20%, rgba(95, 124, 255, 0.20) 0%, rgba(95, 124, 255, 0) 30%), radial-gradient(circle at 90% 10%, rgba(20, 184, 166, 0.20) 0%, rgba(20, 184, 166, 0) 35%), radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.16) 0%, rgba(249, 115, 22, 0) 35%)',
      },
    },
  },
  plugins: [],
}
