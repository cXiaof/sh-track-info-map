module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: 'var(--pantone-2022)',
      },
    },
  },
  plugins: [],
}
