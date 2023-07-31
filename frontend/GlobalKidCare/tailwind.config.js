/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mp4}"],
  mode: "jit",
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      fontFamily: {
        main: "Instrument serif",
      },
      colors: {
        primary: "#152923",
        secondary: "#503a3a",
        tertiary: "#f65151",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#fef4f4",
        "red-100": "red",
      },
      boxShadow: {
        miniCard: "0px 0px 4px 2px rgba(0, 0, 0, 0.08)",
        card: "0px 4px 45px rgba(0, 0, 0, 0.06)",
      },
      screens: {
        xs: "450px",
        ss: "280px",
      },
      backgroundImage: {
        "pattern-1":
          "linear-gradient(135deg, rgba(106,26,20,1) 0%, rgba(169,99,43,1) 65%);",
        "pattern-2":
          "linear-gradient(135deg, rgba(49,86,49,1) 0%, rgba(81,174,165,1) 85%);",
        "pattern-3":
          "linear-gradient(135deg, rgba(59,73,32,1) 15%, rgba(228,100,53,1) 85%);",
        "pattern-4":
          "linear-gradient(135deg, rgba(92,56,132,1) 20%, rgba(165,51,82,1) 90%);",
      },
    },
  },
  plugins: [],
};
