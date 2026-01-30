/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0F",
        lime: "#C6F543",
        slate: "#0F172A",
        fog: "#E2E8F0"
      },
      boxShadow: {
        glow: "0 0 40px rgba(198, 245, 67, 0.25)"
      }
    }
  },
  plugins: []
};
