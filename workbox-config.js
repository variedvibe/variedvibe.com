module.exports = {
  globDirectory: "public",
  globPatterns: ["**/*.{js,css,svg}", "index.html"],
  swSrc: `dist/sw.generated.js`,
  swDest: `dist/sw.generated.js`,
  maximumFileSizeToCacheInBytes: 10000000, // 10 MB,
};
