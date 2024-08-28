/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-black':'rgb(64 64 64 / 34%)',
      },
      screens: {
        'xl2': '1063px',
      },
    },
  },
  plugins: [],
}

