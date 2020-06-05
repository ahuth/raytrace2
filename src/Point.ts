import Vec3 from './Vec3';
import random from './random';

export default class Point extends Vec3 {
  /**
   * Find a random point inside a unit sphere (which has a length of one).
   */
  static randomInUnitSphere(): Point {
    // To find a random point inside a unit sphere, repeatedly pick points in a unit cube until we
    // find one that fits inside the sphere.
    while (true) {
      const vec = Vec3.random(-1, 1);
      if (vec.lengthSquared() >= 1) { continue; }
      return vec;
    }
  }

  /**
   * find a random point on a unit sphere that is in the same hemisphere as a normal.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/analternativediffuseformulation
   */
  static randomInHemisphere(normal: Vec3): Point {
    const inUnitSphere = Point.randomInUnitSphere();

    // Ensure that the point is in the same hemisphere as the normal.
    if (inUnitSphere.dotProduct(normal) > 0) {
      return inUnitSphere;
    } else {
      return inUnitSphere.negate();
    }
  }

  /**
   * Find a random point inside a unit disk.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#defocusblur/generatingsamplerays
   */
  static randomInUnitDisk() {
    while (true) {
      const vec = new Vec3(random(-1, 1), random(-1, 1), 0);
      if (vec.lengthSquared() >= 1) { continue; }
      return vec;
    }
  }
}
