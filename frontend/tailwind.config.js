module.exports = {
  purge: ['./src/**/*.vue'],
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
