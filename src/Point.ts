import Vec3 from './Vec3';

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
}
