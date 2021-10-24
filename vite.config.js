const { appConfig } = require("./package.json");
const viteMainJs = require("vite-main-js");
const { loadEnv } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { injectHtml } = require("vite-plugin-html");

const { port } = appConfig;

process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd()),
};

const production = process.env.NODE_ENV === "production";
const baseUrl = process.env.VITE_BASE_URL ?? process.env.BASE_URL;

module.exports = {
  server: {
    port: port,
  },
  build: {
    cssCodeSplit: false,
  },
  optimizeDeps: {
    exclude: ["@roxi/routify"],
  },
  resolve: {
    dedupe: ["@roxi/routify"],
  },
  plugins: [
    viteMainJs(),
    svelte({
      preprocess: [],
      emitCss: true,
      hot: !production,
    }),
    injectHtml({
      data: {
        baseUrl: baseUrl,
      },
    }),
  ],
};
