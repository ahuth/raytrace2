import Camera, { aspectRatio } from './Camera';
import Color from './Color';
import Point from './Point';
import Sphere from './Sphere';
import Hittables from './Hittables';
import random from './random';

// Output an image in the PPM format.
// See https://en.wikipedia.org/wiki/Netpbm#PPM_example.

const imageWidth = 256;
const imageHeight = Math.floor(imageWidth / aspectRatio);
const samplesPerPixel = 100;

console.log(`P3\n${imageWidth} ${imageHeight}\n255`);

const world = new Hittables();
world.add(new Sphere(new Point(0, 0, -1), 0.5));
world.add(new Sphere(new Point(0, -100.5, -1), 100));

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0);
  process.stderr.cursorTo(0);
  process.stderr.write(`Scanlines remaining: ${j}`);

  for (let i = 0; i < imageWidth; i++) {
    const colorSamples = [];

    // For each pixel, send many rays through the scene (with slight randomness) and average the
    // results together.
    for (let s = 0; s < samplesPerPixel; s++) {
      const u = (i + random(-1, 1)) / (imageWidth - 1);
      const v = (j + random(-1, 1)) / (imageHeight - 1);

      const ray = Camera.getRay(u, v);
      const sampledColor = ray.color(world);
      colorSamples.push(sampledColor);
    }

    const pixelColor = Color.average(colorSamples);
    console.log(pixelColor.toString());
  }
}

console.error('\nDone');
