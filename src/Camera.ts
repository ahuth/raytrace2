import Point from './Point';
import Vec3 from './Vec3';
import Ray from './Ray';

export default class Camera {
  origin: Point;
  lowerLeftCorner: Point;
  horizontal: Vec3;
  vertical: Vec3;
  lensRadius: number;

  w: Vec3;
  u: Vec3;
  v: Vec3;

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
    /**
     * Diameter of the camera "lens". The wider it is, the more out-of-focus items not at the
     * focusDistance will be.
     */
    aperature: number,
    /**
     * The distance at which items will be in perfect focus.
     */
    focusDistance: number,
  ) {
    const theta = degreesToRadians(verticalFov);
    const h = Math.tan(theta / 2);

    const viewportHeight = 2 * h;
    const viewportWidth = aspectRatio * viewportHeight;

    // Convert `viewUp` to a vector pointing up but perpendicular to the direction the camera is
    // looking.
    // See https://raytracing.github.io/books/RayTracingInOneWeekend.html#positionablecamera/positioningandorientingthecamera
    const lookDirection = lookFrom.subtract(lookTo);

    this.w = lookDirection.unit();
    this.u = viewUp.crossProduct(this.w).unit();
    this.v = this.w.crossProduct(this.u);

    this.origin = lookFrom;
    this.horizontal = this.u.scaleUp(viewportWidth).scaleUp(focusDistance);
    this.vertical = this.v.scaleUp(viewportHeight).scaleUp(focusDistance);

    this.lowerLeftCorner = this.origin
      .subtract(this.horizontal.scaleDown(2))
      .subtract(this.vertical.scaleDown(2))
      .subtract(this.w.scaleUp(focusDistance));

    this.lensRadius = aperature / 2;
  }

  getRay(s: number, t: number) {
    const rD = Point.randomInUnitDisk().scaleUp(this.lensRadius);
    const offset = this.u.scaleUp(rD.x).add(this.v.scaleUp(rD.y));
    const direction = this.lowerLeftCorner
      .add(this.horizontal.scaleUp(s))
      .add(this.vertical.scaleUp(t))
      .subtract(this.origin)
      .subtract(offset);

    return new Ray(this.origin.add(offset), direction);
  }
}

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
