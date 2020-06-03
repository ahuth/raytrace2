import Vec3 from './Vec3';

export default class Color extends Vec3 {
  /**
   * Color created from red, green, and blue values. Each value should be between 0 and 1.
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(r: number, g: number, b: number) {
    super(r, g, b);
  }

  /**
   * Average multiple colors together.
   */
  static average(colors: Color[]) {
    const sum = colors.reduce(function (acc, color) {
      return acc.add(color) as Color;
    }, new Color(0, 0, 0));

    const average = sum.scaleDown(colors.length);

    // The `scaleDown` operation returns a Vec3. Manually convert it to a color here.
    return new Color(average.x, average.y, average.z);
  }

  get r() {
    return this.x;
  }

  get g() {
    return this.y;
  }

  get b() {
    return this.z;
  }

  /**
   * Write out the full 0-255 value for each color component, instead of the 0-1 that is stored.
   */
  toString() {
    const clampedR = clamp(this.r, 0, 0.999);
    const clampedG = clamp(this.g, 0, 0.999);
    const clampedB = clamp(this.b, 0, 0.999);

    const ir = Math.floor(256 * clampedR);
    const ig = Math.floor(256 * clampedG);
    const ib = Math.floor(256 * clampedB);

    return `${ir} ${ig} ${ib}`;
  }
}

function clamp(num: number, min: number, max: number) {
  if (num < min) { return min; }
  if (num > max) { return max; }
  return num;
}
