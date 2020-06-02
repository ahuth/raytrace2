export default class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
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

  private lengthSquared() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  }
}
