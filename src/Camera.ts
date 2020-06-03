import Point from './Point';
import Vec3 from './Vec3';
import Ray from './Ray';

export const aspectRatio = 16 / 9;
const focalLength = 1;
const viewportHeight = 2;
const viewportWidth = aspectRatio * viewportHeight;

const origin = new Point(0, 0, 0);
const horizontal = new Vec3(viewportWidth, 0, 0);
const vertical = new Vec3(0, viewportHeight, 0);
const lowerLeftCorner = origin
  .subtract(horizontal.scaleDown(2))
  .subtract(vertical.scaleDown(2))
  .subtract(new Vec3(0, 0, focalLength));

export default class Camera {
  static getRay(u: number, v: number) {
    const direction = lowerLeftCorner
      .add(horizontal.scaleUp(u))
      .add(vertical.scaleUp(v))
      .subtract(origin);

    return new Ray(origin, direction);
  }
}
