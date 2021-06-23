module.exports = {
  purge: ['./src/**/*.vue', './index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        burgundy: '#960e0b',
        red: {
          DEFAULT: '#e60400',
          dark: '#bb0e0a',
        },
      },
      transitionProperty: {
        height: 'height',
      },
      minWidth: {
        80: '20rem',
      },
      maxWidth: {
        80: '20rem',
        '3card': '66rem',
        '2card': '44.5rem',
      },
      width: {
        '3card': '66rem',
        '2card': '44.5rem',
      },
      screens: {
        '2card': '840px',
        '3card': '1184px',
      },
    },
    fontFamily: {
      kollektif: ['Kollektif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
