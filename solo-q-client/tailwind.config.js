/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ⭐ 이 줄이 핵심
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
