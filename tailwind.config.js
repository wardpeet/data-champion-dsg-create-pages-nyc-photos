module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          default: '#663399',
          primary: '#7026B9'
        }
      },
      gridTemplateColumns: {
        ['auto-1fr']: 'auto 1fr',
        ['1fr-auto']: '1fr auto'
      },
      width: {
        200: '200px'
      },
      height: {
        200: '200px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
