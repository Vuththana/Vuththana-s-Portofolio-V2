/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1900f7",
        "secondary-color": "#1a06cc"
      }
    },
    fontFamily: {
      Roboto: ["Roboto", "san-serif"],
      vt232: ["vt323", "Roboto", "san-serif"]
    },
    container: {
      padding: "2rem",
      center: true
    },
    screens: {
      sm: "640px",
      md: "768px"
    }
  },
  plugins: [],
}

