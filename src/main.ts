import Camera, { aspectRatio } from './Camera';
import Color from './Color';
import LambertianMatte from './materials/LambertianMatte';
import Matte from './materials/Matte';
import Metal from './materials/Metal';
import Point from './Point';
import Sphere from './objects/Sphere';
import Hittables from './Hittables';
import random from './random';

// Output an image in the PPM format.
// See https://en.wikipedia.org/wiki/Netpbm#PPM_example.

const imageWidth = 256;
const imageHeight = Math.floor(imageWidth / aspectRatio);
const samplesPerPixel = 100;
const maxBounces = 50;

console.log(`P3\n${imageWidth} ${imageHeight}\n255`);

const world = new Hittables();
world.add(new Sphere(new Point(0, 0, -1), 0.5, new LambertianMatte(new Color(0.7, 0.3, 0.3))));
world.add(new Sphere(new Point(0, -100.5, -1), 100, new Matte(new Color(0.8, 0.8, 0))));
world.add(new Sphere(new Point(1, 0, -1), 0.5, new Metal(new Color(0.8, 0.6, 0.2))));
world.add(new Sphere(new Point(-1, 0, -1), 0.5, new Metal(new Color(0.8, 0.8, 0.8))));

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
      const sampledColor = ray.color(world, maxBounces);
      colorSamples.push(sampledColor);
    }

    const pixelColor = Color.average(colorSamples);
    console.log(pixelColor.toString());
  }
}

console.error('\nDone');
