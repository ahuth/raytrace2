import Point from './Point';
import Ray from './Ray';

export default class Sphere {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  /**
   * Determine if the sphere is intersected by a ray.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#addingasphere/creatingourfirstraytracedimage
   */
  isIntersectedBy(ray: Ray): boolean {
    const offCenter = ray.origin.subtract(this.center);
    const a = ray.direction.dotProduct(ray.direction);
    const b = 2 * offCenter.dotProduct(ray.direction);
    const c = offCenter.dotProduct(offCenter) - this.radius * this.radius;
    const discriminant = b * b - 4 * a * c;
    return discriminant > 0;
  }
}
