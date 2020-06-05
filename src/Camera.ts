import Point from './Point';
import Vec3 from './Vec3';
import Ray from './Ray';

export default class Camera {
  origin: Point;
  lowerLeftCorner: Point;
  horizontal: Vec3;
  vertical: Vec3;

  constructor(
    lookFrom: Point,
    lookTo: Point,
    /**
     * A vector pointing "up" to the top of the camera. This allows the view to be rotated or
     * tilted.
     */
    viewUp: Vec3,
    verticalFov: number,
    aspectRatio: number,
  ) {
    const theta = degreesToRadians(verticalFov);
    const h = Math.tan(theta / 2);

    const viewportHeight = 2 * h;
    const viewportWidth = aspectRatio * viewportHeight;

    // Convert `viewUp` to a vector pointing up but perpendicular to the direction the camera is
    // looking.
    // See https://raytracing.github.io/books/RayTracingInOneWeekend.html#positionablecamera/positioningandorientingthecamera
    const lookDirection = lookFrom.subtract(lookTo);
    const w = lookDirection.unit();
    const u = viewUp.crossProduct(w).unit();
    const v = w.crossProduct(u);

    this.origin = lookFrom;
    this.horizontal = u.scaleUp(viewportWidth);
    this.vertical = v.scaleUp(viewportHeight);

    this.lowerLeftCorner = this.origin
      .subtract(this.horizontal.scaleDown(2))
      .subtract(this.vertical.scaleDown(2))
      .subtract(w);
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
