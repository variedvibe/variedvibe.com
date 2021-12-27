const { appConfig } = require("./package.json");
const { loadEnv } = require("vite");

process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd()),
};

const baseUrl = process.env.VITE_BASE_URL ?? process.env.BASE_URL;

module.exports = {
  sourceDir: appConfig.assetsDir,
  pages: appConfig.pagesDir,
  distDir: appConfig.distDir,
  extensions: ["svelte", "html", "svx", "md"],
  plugins: {},
};
