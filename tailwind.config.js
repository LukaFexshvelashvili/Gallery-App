/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inputBg: "#f3f3f3",
        inputBgActive: "#EFEFEF",
        whiteLoader: "#f3f3f3",
        whiteHover: "#f7f7f7",
        mainText: "rgba(0, 0, 0, 0.8)",
        descText: "rgba(0, 0, 0, 0.5)",
      },
      screens: {
        mobile: { max: "990px" },
        laptop: { max: "1280px" },
        laptopsm: { max: "1200px" },
      },
    },
  },
  plugins: [],
};
