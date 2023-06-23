/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: {
            primary: '#fff',
          },
          button: {
            primary: '#2B292B',
          },
          text: {
            primary: '#2B292B',
          },
          border: {
            primary: '#F2F2F6',
          }
        },
        dark: {
          bg: {
            primary: '#2B292B',
          },
          button: {
            primary: '#F5F5F7',
          },
          text: {
            primary: '#F5F5F7',
          },
          border: {
            primary: '#484848',
          }
        },
      },
    },
  },
  safelist: [
    'dark', 
    { pattern: /^(bg-dark-|text-dark-|border-dark-|bg-light-|text-light-|border-light-)/ },
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
