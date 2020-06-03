import Point from './Point';
import Ray from './Ray';
import Vec3 from './Vec3';

export default class HitRecord {
  frontFace: boolean;
  normal: Vec3;
  point: Point;
  time: number;

  constructor(ray: Ray, time: number, outwardNormal: Vec3) {
    // Determine if the hit was on the front or back face of an object.
    this.frontFace = ray.direction.dotProduct(outwardNormal) < 0;
    this.point = ray.at(time);
    this.time = time;
    this.normal = this.frontFace ? outwardNormal : outwardNormal.negate();
  }
}
