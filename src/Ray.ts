import Color from './Color';
import type Hittable from './Hittable';
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
  color(world: Hittable): Color {
    const hit = world.hit(this, 0, Infinity);

    if (hit) {
      const c = hit.normal.add(new Color(1, 1, 1)).scaleUp(0.5);

      // The `scaleUp` operation return a Vec3, not a Color. Get around that by explicitly
      // instantiating a new Color object.
      return new Color(c.x, c.y, c.z);
    }

    const unitDirection = this.direction.unit();
    const time = 0.5 * (unitDirection.y + 1);

    const a = new Color(1, 1, 1).scaleUp(1 - time);
    const b = new Color(0.5, 0.7, 1).scaleUp(time);
    const c = a.add(b);

    // The `scaleUp` and `add` operations return a Vec3, not a Color. Get around that by explicitly
    // instantiating a new Color object.
    return new Color(c.x, c.y, c.z);
  }
}
