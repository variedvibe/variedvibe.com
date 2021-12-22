#!/usr/bin/env node

import os from "os";
import path from "path";
import fs from "fs/promises";

import squoosh from "@squoosh/lib";

// Target widths for resizing the image
//
// NOTE: `0` means "no resize" or existing width.
const imageResizeTargets = [0, 4000, 2000, 1000, 750, 500, 250];

const encodeOptions = {
  mozjpeg: {
    quality: 90,
  },
};

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("No file arguments passed.");
  printUsage();
  process.exit(1);
}

const imagePool = new squoosh.ImagePool(os.cpus().length);

for (const filePath of args) {
  const fileExt = path.extname(filePath);
  const fileName = path.basename(filePath, fileExt);
  const dirName = path.dirname(filePath);

  const normalizedFileName = normalizeFileName(fileName);

  const file = await fs.readFile(filePath);
  const image = imagePool.ingestImage(file);
  const imageMeta = await image.decoded;

  const imageWidth = imageMeta.bitmap.width;
  const resizeTargets = imageResizeTargets.filter(
    (targetWidth) => targetWidth < imageWidth
  );

  for (const targetWidth of resizeTargets) {
    const preprocessOptions = {};

    if (targetWidth > 0) {
      // Only resize when targeting a width
      preprocessOptions.resize = {
        enabled: true,
        width: targetWidth,
      };
    }

    await image.preprocess(preprocessOptions);
    await image.encode(encodeOptions);

    for (const encodedImage of Object.values(image.encodedWith)) {
      const encodedResult = await encodedImage;

      // const newFileName = `${normalizedFileName}_${targetWidth}x.${encodedResult.extension}`;
      const newFileName = generateFileName(
        normalizedFileName,
        targetWidth,
        encodedResult.extension
      );
      const writePath = path.join(dirName, newFileName);

      console.log(`Writing file to path: '${writePath}'`);

      await fs.writeFile(writePath, encodedResult.binary);
    }
  }
}

await imagePool.close();

function normalizeFileName(name) {
  // Replace spaces with dashes, remove consecutive dashes, and lowercase.
  return name.replaceAll(" ", "-").replaceAll(/-+/g, "-").toLowerCase();
}

function generateFileName(name, targetWidth, extension) {
  if (targetWidth > 0) {
    name = `${name}_${targetWidth}x`;
  }

  return `${name}.${extension}`;
}

function printUsage() {
  const binName = path.basename(process.argv[1]);

  console.log(`\nUsage:\t${binName} ./path/to/image.jpg /other/image.webp`);
}
