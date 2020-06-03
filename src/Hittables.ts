import Hittable from './Hittable';
import HitRecord from './HitRecord';
import type Ray from './Ray';

export default class Hittables extends Hittable {
  objects: Hittable[] = [];

  clear() {
    this.objects = [];
  }

  add(object: Hittable): void {
    this.objects.push(object);
  }

  /**
   * Return a hit for the closest item in this list of objects.
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/alistofhittableobjects
   */
  hit(ray: Ray, minTime: number, maxTime: number): HitRecord | null {
    let closestHit: HitRecord | null = null;

    for (const object of this.objects) {
      // Because we search for hits with a max time of the closest previous hit's time, we'll only
      // find only hits that are "closer".
      const objectHit = object.hit(ray, minTime, closestHit?.time ?? maxTime);

      if (objectHit) {
        closestHit = objectHit;
      }
    }

    return closestHit;
  }
}
