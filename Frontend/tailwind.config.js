/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
      },
      borderRadius: {
        'custom-tl-tr': '15px 15px 0 0',
      },
      scrollBehavior: {
        'smooth': 'smooth',
      },
      zIndex: {
        '1': '1',
      },
      
    },
    variants: {
    extend: {},
  },
  },
  plugins: [],
}

