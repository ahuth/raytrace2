import type Color from './Color';
import type HitRecord from './HitRecord';
import type Ray from './Ray';

type Scattered = {
  attenuation: Color,
  ray: Ray,
}

export default abstract class Material {
  abstract scatter(ray: Ray, hit: HitRecord): Scattered | null;
}
