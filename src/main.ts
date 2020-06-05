import Camera from './Camera';
import Color from './Color';
import Point from './Point';
import Vec3 from './Vec3';
import random from './random';
import randomScene from './randomScene';

// Output an image in the PPM format.
// See https://en.wikipedia.org/wiki/Netpbm#PPM_example.

const aspectRatio = 16 / 9;
const imageWidth = 256;
const imageHeight = Math.floor(imageWidth / aspectRatio);
const samplesPerPixel = 100;
const maxBounces = 50;

console.log(`P3\n${imageWidth} ${imageHeight}\n255`);

const world = randomScene();

const camera = new Camera(
  // Look from
  new Point(13, 2, 3),
  // Look to
  new Point(0, 0, 0),
  // Camera rotation. Right now points straight up, so the camera is not tilted at all.
  new Vec3(0, 1, 0),
  // Field of view.
  20,
  // Aspect ratio.
  aspectRatio,
  // Aperature
  0.1,
  // Distance to focus
  10,
);

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0);
  process.stderr.cursorTo(0);
  process.stderr.write(`Scanlines remaining: ${j}`);

  for (let i = 0; i < imageWidth; i++) {
    const colorSamples = [];

    // For each pixel, send many rays through the scene (with slight randomness) and average the
    // results together.
    // See https://raytracing.github.io/books/RayTracingInOneWeekend.html#metal/fuzzyreflection.
    for (let s = 0; s < samplesPerPixel; s++) {
      const u = (i + random(-1, 1)) / (imageWidth - 1);
      const v = (j + random(-1, 1)) / (imageHeight - 1);

      const ray = camera.getRay(u, v);
      const sampledColor = ray.color(world, maxBounces);
      colorSamples.push(sampledColor);
    }

    const pixelColor = Color.average(colorSamples);
    console.log(pixelColor.toString());
  }
}

console.error('\nDone');
