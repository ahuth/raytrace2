import Color from './Color';
import Point from './Point';
import Sphere from './Sphere';
import Vec3 from './Vec3';

const sphere = new Sphere(new Point(0, 0, -1), 0.5);

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
    const sphereHit = sphere.intersection(this);

    if (sphereHit > 0) {
      const N = this.at(sphereHit).subtract(new Point(0, 0, -1)).unit();
      const c = new Color(N.x + 1, N.y + 1, N.z + 1).scaleUp(0.5);

      // The `scaleUp` operation return a Vec3, not a Color. Get around that by explicitly
      // instantiating a new Color object.
      return new Color(c.x, c.y, c.z);
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
}
