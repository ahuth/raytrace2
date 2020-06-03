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
   * Determine the "hit point" a ray has with the sphere. I'm not 100% sure what this number
   * represents. It might be the distance from the center of the sphere to the ray (perpendicular?).
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/shadingwithsurfacenormals
   */
  intersection(ray: Ray) {
    const fromRayToCenter = ray.origin.subtract(this.center);

    // const a = ray.direction.dotProduct(ray.direction);
    // const b = 2 * fromRayToCenter.dotProduct(ray.direction);
    // const c = fromRayToCenter.dotProduct(fromRayToCenter) - this.radius * this.radius;
    // const discriminant = b * b - 4 * a * c;

    const a = ray.direction.lengthSquared();
    const halfB = fromRayToCenter.dotProduct(ray.direction);
    const c = fromRayToCenter.lengthSquared() - this.radius * this.radius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant < 0 || a === 0) {
      return -1;
    }

    return (-halfB - Math.sqrt(discriminant)) / a;
  }
}
