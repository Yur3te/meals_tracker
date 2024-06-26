/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      slate: colors.slate,
      slateGray: colors.slateGray,
      rose: colors.rose,
      red: colors.red,
      green: colors.green,
      'navy': {
        800 :  "#021f57",
        900 : "#00194a",
      }
    },
    extend: {},
  },
  plugins: [],
}

