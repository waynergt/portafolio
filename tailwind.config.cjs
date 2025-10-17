module.exports = {
  darkMode: 'class', // <- activado: controlado por la clase "dark"
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};