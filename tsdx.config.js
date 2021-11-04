/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const postcss = require("rollup-plugin-postcss");

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css", ".ts"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      })
    );
    return config;
  },
};
