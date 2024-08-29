import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#4440B4",
        darkblue: "#312E81",
      },
    },
  },
  plugins: [daisyui],
};
