/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "text-gradient":
          "linear-gradient(to left, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 100%)",
      },
    },
  },
  plugins: [],
};
