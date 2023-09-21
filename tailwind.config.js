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
        'maghony': ['Maghony2'],
        'klein': ['Klein'],
        'theSeasons': ['TheSeasons'],
        'theSeasons2': ['TheSeasons2'],
      },
      backgroundImage: {
        'mainBackground': "url('img/background.png')",
      },
    },
  },
  plugins: [],
}
