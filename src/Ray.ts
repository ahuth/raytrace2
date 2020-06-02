import Color from './Color';
import Point from './Point';
import Vec3 from './Vec3';

export default class Ray {
  origin: Point;
  direction: Vec3;

  constructor(origin: Point, direction: Vec3) {
    this.origin = origin;
    this.direction = direction;
  }

  at(time: number): Point {
    return this.origin.add(this.direction.scaleUp(time));
  }

  /**
   * Get the color of the background the ray strikes. For now, this just returns a gradient.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#rays,asimplecamera,andbackground/sendingraysintothescene
   */
  color(): Color {
    if (this.hitsSphere(new Point(0, 0, -1), 0.5)) {
      return new Color(1, 0, 0);
    }

    const unitDirection = this.direction.unit();
    const factor = 0.5 * (unitDirection.y + 1);

    const a = new Color(1, 1, 1).scaleUp(1 - factor);
    const b = new Color(0.5, 0.7, 1).scaleUp(factor);
    const c = a.add(b);

    // The `scaleUp` and `add` operations return a Vec3, not a Color. Get around that by explicitly
    // instantiating a new Color object.
    return new Color(c.x, c.y, c.z);
  }

  /**
   * Determine if this ray hits a sphere. This is hardcoded logic that will be moved out of here at
   * some point.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#addingasphere/creatingourfirstraytracedimage
   */
  hitsSphere(center: Point, radius: number) {
    const offCenter = this.origin.subtract(center);
    const a = this.direction.dotProduct(this.direction);
    const b = 2 * offCenter.dotProduct(this.direction);
    const c = offCenter.dotProduct(offCenter) - radius * radius;
    const discriminant = b * b - 4 * a * c;
    return discriminant > 0;
  }
}
