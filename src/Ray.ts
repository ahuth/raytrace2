import Point from './Point';
import Vec3 from './Vec3';

export default class Ray {
  origin: Point;
  direction: Vec3;

  constructor(origin: Point, direction: Vec3) {
    this.origin = origin;
    this.direction = direction;
  }

  at(time: number): Point {
    return this.origin.add(this.direction.scaleUp(time));
  }
}
