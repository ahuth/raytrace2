import HitRecord from './HitRecord';
import Hittable from './Hittable';
import type Material from './Material';
import type Point from './Point';
import type Ray from './Ray';

export default class Sphere extends Hittable {
  center: Point;
  radius: number;
  material: Material;

  constructor(center: Point, radius: number, material: Material) {
    super();
    this.center = center;
    this.radius = radius;
    this.material = material;
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

        return new HitRecord(
          ray,
          time,
          point.subtract(this.center).scaleDown(this.radius),
          this.material,
        );
      }

      // TODO: combine this case with the above one.
      time = (-halfB + root) / a;

      if (time > minTime && time < maxTime) {
        const point = ray.at(time);

        return new HitRecord(
          ray,
          time,
          point.subtract(this.center).scaleDown(this.radius),
          this.material,
        );
      }
    }

    return null;
  }
}
