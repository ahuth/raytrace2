import Hittable, { HitRecord } from './Hittable';
import Point from './Point';
import Ray from './Ray';

export default class Sphere extends Hittable {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
  }

  /**
   * Get information about a ray's hit on the sphere (if it does hit).
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/anabstractionforhittableobjects
   */
  hit(ray: Ray, minTime: number, maxTime: number): HitRecord | null {
    const fromRayToCenter = ray.origin.subtract(this.center);
    const a = ray.direction.lengthSquared();
    const halfB = fromRayToCenter.dotProduct(ray.direction);
    const c = fromRayToCenter.lengthSquared() - this.radius * this.radius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant > 0 && a > 0) {
      const root = Math.sqrt(discriminant);
      let time = (-halfB - root) / a;

      if (time > minTime && time < maxTime) {
        const point = ray.at(time);

        return {
          time,
          point,
          normal: point.subtract(this.center).scaleDown(this.radius),
        };
      }

      // TODO: combine this case with the above one.
      time = (-halfB + root) / a;

      if (time > minTime && time < maxTime) {
        const point = ray.at(time);

        return {
          time,
          point,
          normal: point.subtract(this.center).scaleDown(this.radius),
        };
      }
    }

    return null;
  }
}
