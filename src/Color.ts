import Vec3 from './Vec3';

export default class Color extends Vec3 {
  /**
   * Color created from red, green, and blue values. Each value should be between 0 and 1.
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(r: number, g: number, b: number) {
    super(r, g, b);
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
    const ir = Math.floor(255.999 * this.r);
    const ig = Math.floor(255.999 * this.g);
    const ib = Math.floor(255.999 * this.b);
    return `${ir} ${ig} ${ib}`;
  }
}
