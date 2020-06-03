import Point from './Point';
import Ray from './Ray';
import Vec3 from './Vec3';

export type HitRecord = {
  point: Point,
  normal: Vec3,
  time: number,
}

export default abstract class Hittable {
  abstract hit(ray: Ray, minTime: number, maxTime: number): HitRecord | null;
}
