/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#222831",
        color2: "#393E46",
        color3: "#00ADB5",
        color4: "#EEEEEE",
      },
      transitionProperty: {
        height: "height",
      },
    },
    screens: {
      xm: "430px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1440px",
      1300: "1300px",
    },
  },
  plugins: [],
};
