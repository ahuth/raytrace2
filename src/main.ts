import Point from './Point';
import Ray from './Ray';
import Sphere from './Sphere';
import Vec3 from './Vec3';
import Hittables from './Hittables';

// Output an image in the PPM format.
// See https://en.wikipedia.org/wiki/Netpbm#PPM_example.

const aspectRatio = 16 / 9;
const focalLength = 1;
const imageWidth = 256;
const imageHeight = Math.floor(imageWidth / aspectRatio);
const viewportHeight = 2;
const viewportWidth = aspectRatio * viewportHeight;

console.log(`P3\n${imageWidth} ${imageHeight}\n255`);

const origin = new Point(0, 0, 0);
const horizontal = new Vec3(viewportWidth, 0, 0);
const vertical = new Vec3(0, viewportHeight, 0);
const lowerLeftCorner = origin
  .subtract(horizontal.scaleDown(2))
  .subtract(vertical.scaleDown(2))
  .subtract(new Vec3(0, 0, focalLength));

const world = new Hittables();
world.add(new Sphere(new Point(0, 0, -1), 0.5));

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0);
  process.stderr.cursorTo(0);
  process.stderr.write(`Scanlines remaining: ${j}`);

  for (let i = 0; i < imageWidth; i++) {
    const horizontalFactor = i / (imageWidth - 1);
    const verticalFactor = j / (imageHeight - 1);
    const direction = lowerLeftCorner
      .add(horizontal.scaleUp(horizontalFactor))
      .add(vertical.scaleUp(verticalFactor))
      .subtract(origin);

    const ray = new Ray(origin, direction);
    const pixelColor = ray.color(world);

    console.log(pixelColor.toString());
  }
}

console.error('\nDone');
