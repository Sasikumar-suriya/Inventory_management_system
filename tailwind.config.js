/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Deep Black-Blue
        secondary: "#1E293B", // Dark Gray
        background: "#F8F9FA", // Soft White
        accent: "#FACC15", // Golden Yellow
      },
    },
  },
  plugins: [],
}

