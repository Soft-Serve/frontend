const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern:
        /text-(red|green|blue|rose|pink|fuchsia|purple|violet|indigo|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|slate|gray|zinc|neutral|stone)-(400|500|600|700|800|900)/,
      variants: ["hover", "focus"],
    },
    {
      pattern:
        /bg-(red|green|blue|rose|pink|fuchsia|purple|violet|indigo|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|slate|gray|zinc|neutral|stone)-(100|200|300|400|500|600|700|800|900)/,
      variants: ["hover", "focus"],
    },
    {
      pattern:
        /border-(red|green|blue|rose|pink|fuchsia|purple|violet|indigo|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|slate|gray|zinc|neutral|stone)-(400|500|600|700|800|900)/,
    },
    {
      pattern: /font-(Sans|Arima|Baskerville|Cardo|Oswald|Quicksand|Raleway)/,
    },
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    black: colors.black,
    white: colors.white,
    rose: colors.rose,
    pink: colors.pink,
    fuchsia: colors.fuchsia,
    purple: colors.purple,
    violet: colors.violet,
    indigo: colors.indigo,
    blue: colors.blue,
    sky: colors.sky,
    cyan: colors.cyan,
    teal: colors.teal,
    emerald: colors.emerald,
    green: colors.green,
    lime: colors.lime,
    yellow: colors.yellow,
    amber: colors.amber,
    orange: colors.orange,
    red: colors.red,
    slate: colors.slate,
    gray: colors.gray,
    zinc: colors.zinc,
    neutral: colors.neutral,
    stone: colors.stone,
    extend: {
      fontFamily: {
        Sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        Arima: ["Arima Madurai", "cursive"],
        Baskerville: ["Libre Baskerville", "serif"],
        Cardo: ["Cardo", "serif"],
        Oswald: ["Oswald", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
