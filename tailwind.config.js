module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        squid: {
          DEFAULT: '#232f3e',
        },
        primary: {
          700: '#dd6b10',
          600: '#eb5f07',
          DEFAULT: '#ec7211',
          100: '#ff9900',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
