import Point from './Point';
import Vec3 from './Vec3';
import Ray from './Ray';

export default class Camera {
  origin: Point;
  lowerLeftCorner: Point;
  horizontal: Vec3;
  vertical: Vec3;

  constructor(verticalFov: number, aspectRatio: number) {
    const theta = degreesToRadians(verticalFov);
    const h = Math.tan(theta / 2);

    const focalLength = 1;
    const viewportHeight = 2 * h;
    const viewportWidth = aspectRatio * viewportHeight;

    this.origin = new Point(0, 0, 0);
    this.horizontal = new Vec3(viewportWidth, 0, 0);
    this.vertical = new Vec3(0, viewportHeight, 0);
    this.lowerLeftCorner = this.origin
      .subtract(this.horizontal.scaleDown(2))
      .subtract(this.vertical.scaleDown(2))
      .subtract(new Vec3(0, 0, focalLength));
  }

  getRay(u: number, v: number) {
    const direction = this.lowerLeftCorner
      .add(this.horizontal.scaleUp(u))
      .add(this.vertical.scaleUp(v))
      .subtract(this.origin);

    return new Ray(this.origin, direction);
  }
}

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
