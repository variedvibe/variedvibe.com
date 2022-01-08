module.exports = {
  globDirectory: "dist",

  // Order matters here, so we want to cache our most important assets first and
  // separate by type instead of just using a giant wildcard/splat.
  globPatterns: [
    "index.html",
    "**/*.css",
    "**/*.{ttf,otf,woff}",
    "**/*.js",
    "**/*.{svg,png}",
  ],
  globIgnores: [
    "noscript.*",
    "favicon.*",
    "manifest.*",
    "apple-touch-icon.*",
    "assets/launcher-icons/*",
    "safari-pinned-tab.*",
    "browserconfig.*",
    "assets/open-graph-image.*",
  ],

  maximumFileSizeToCacheInBytes: 10000000, // 10 MB,
  swSrc: "dist/sw.generated.js",
  swDest: "dist/sw.generated.js",
};
