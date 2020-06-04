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
  color(world: Hittable, bouncesRemaining = 1): Color {
    // If we've exceeded the ray bounce limit, no more light is gathered.
    // @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/limitingthenumberofchildrays
    if (bouncesRemaining <= 0) {
      return new Color(0, 0, 0);
    }

    // Get the first hit on any object in the "world".
    //
    // Note that minTime is 0.001 instead of 0 to avoid hits that are very near 0, which can cause
    // a problem called "shadow acne".
    // See https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/fixingshadowacne.
    const hit = world.hit(this, 0.001, Infinity);

    if (hit) {
      const scattered = hit.material.scatter(this, hit);

      if (scattered) {
        const color = scattered.ray.color(world, bouncesRemaining - 1)
          .multiply(scattered.attenuation);

        // The `multiply` operations return a Vec3, not a Color. Get around that by explicitly
        // instantiating a new Color object.
        return new Color(color.x, color.y, color.z);
      }
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
