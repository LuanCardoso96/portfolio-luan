/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3b82f6',
          accent: '#8b5cf6'
        }
      },
      borderRadius: { 
        '2xl': '1rem' 
      }
    }
  },
  plugins: []
}
