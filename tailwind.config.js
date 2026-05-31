module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rusblue: '#1f4b8f',
        rusred: '#d32f2f',
        ruswhite: '#f7f7fb',
        rusgray: '#2b3140'
      },
      boxShadow: {
        glass: '0 8px 30px rgba(31, 75, 143, 0.12)'
      }
    }
  },
  plugins: []
};
