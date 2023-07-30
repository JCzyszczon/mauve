/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'maghony': ['Maghony'],
        'klein': ['Klein'],
        'theSeasons': ['TheSeasons'],
      },
      backgroundImage: {
        'mainBackground': "url('img/background.png')",
      },
    },
  },
  plugins: [],
}
