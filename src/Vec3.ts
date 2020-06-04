import random from './random';

export default class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static random(min?: number, max?: number) {
    return new Vec3(
      random(min, max),
      random(min, max),
      random(min, max),
    );
  }

  /**
   * Get a random unit vector by picking points on the surface of a unit sphere, offset along the
   * surface normal... whatever that means.
   *
   * Useful for calculating true Lambertian reflection.
   *
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/truelambertianreflection
   */
  static randomUnitVector() {
    const a = random(0, 2 * Math.PI);
    const z = random(-1, 1);
    const r = Math.sqrt(1 - z * z);

    return new Vec3(
      r * Math.cos(a),
      r * Math.sin(a),
      z,
    );
  }

  negate() {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  invert() {
    return new Vec3(1 / this.x, 1 / this.y, 1 / this.z);
  }

  add(other: Vec3) {
    return new Vec3(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z,
    );
  }

  subtract(other: Vec3) {
    return this.add(other.negate());
  }

  multiply(other: Vec3) {
    return new Vec3(
      this.x * other.x,
      this.y * other.y,
      this.z * other.z,
    );
  }

  divide(other: Vec3) {
    return this.multiply(other.invert());
  }

  dotProduct(other: Vec3) {
    return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
  }

  crossProduct(other: Vec3) {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  scaleUp(factor: number) {
    return new Vec3(
      this.x * factor,
      this.y * factor,
      this.z * factor,
    );
  }

  scaleDown(factor: number) {
    return this.scaleUp(1 / factor);
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }

  unit() {
    return this.scaleDown(this.length());
  }

  lengthSquared() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  }

  /**
   * Reflect a factor in relation to a normal.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#metal/mirroredlightreflection
   */
  reflect(normal: Vec3) {
    return this.subtract(
      normal
        .scaleUp(this.dotProduct(normal))
        .scaleUp(2),
    );
  }
}
