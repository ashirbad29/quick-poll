module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        dankPurple: {
          DEFAULT: '#8739FA',
        },
        gradientToPurple: {
          DEFAULT: '#A65FEC',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
