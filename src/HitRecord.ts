import Point from './Point';
import Vec3 from './Vec3';

export default class HitRecord {
  point: Point;
  normal: Vec3;
  time: number;

  constructor(point: Point, time: number, normal: Vec3) {
    this.point = point;
    this.time = time;
    this.normal = normal;
  }
}
