import HitRecord from './HitRecord';
import Ray from './Ray';

export default abstract class Hittable {
  abstract hit(ray: Ray, minTime: number, maxTime: number): HitRecord | null;
}
