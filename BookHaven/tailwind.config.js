/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'book-cream': '#FDFBF7',
        'book-mocha': '#4A3728',
        'book-olive': '#6B705C',
        'book-orange': '#D4A373',
        'book-beige': '#FAEDCD',
        'book-gold': '#D4AF37',
        'book-terracotta': '#A44A3F',
        'dark-romance-bg': '#0a0a0a',
        'dark-romance-red': '#8B0000',
        'romcom-pink': '#FFC0CB',
      },
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        'cozy': '0 4px 20px -2px rgba(74, 55, 40, 0.1), 0 2px 10px -2px rgba(74, 55, 40, 0.05)',
      }
    },
  },
  plugins: [],
}
