/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePath: path.resolve("./public/locales"),
    reloadOnPrerender: process.env.NODE_ENV === "development",
  },
};
