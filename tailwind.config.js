/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f6f1ff',
        '100': '#efe5ff',
        '200': '#e0cfff',
        '300': '#caa8ff',
        '400': '#b277ff',
        '500': '#9e40ff',
        '600': '#9719ff',
        '700': '#8c08f9',
        '800': '#7506d1',
        '900': '#6107ab',
        '950': '#3b0075',
        }
      }
    }
  },
  plugins: [],
}


