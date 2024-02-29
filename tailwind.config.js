/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inputBg: "#f3f3f3",
        inputBgActive: "#EFEFEF",
        whiteLoader: "#f3f3f3",
        mainText: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
