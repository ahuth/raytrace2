import Color from './Color';

// Output an image in the PPM format.
// See https://en.wikipedia.org/wiki/Netpbm#PPM_example.

const imageWidth = 256;
const imageHeight = 256;

console.log(`P3\n${imageWidth} ${imageHeight}\n255`);

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0);
  process.stderr.cursorTo(0);
  process.stderr.write(`Scanlines remaining: ${j}`);

  for (let i = 0; i < imageWidth; i++) {
    const r = i / (imageWidth - 1);
    const g = j / (imageHeight - 1);
    const b = 0.25;
    const color = new Color(r, g, b);

    console.log(color.toString());
  }
}

console.error('\nDone');
