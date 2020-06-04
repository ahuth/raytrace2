import Material from '../Material';
import Ray from '../Ray';
import Vec3 from '../Vec3';
import type Color from '../Color';
import type HitRecord from '../HitRecord';

/**
 * A diffuse (matte) material using Lambertian reflection.
 */
export default class LambertianMatte extends Material {
  albedo: Color;

  constructor(albedo: Color) {
    super();
    this.albedo = albedo;
  }

  scatter(_ray: Ray, hit: HitRecord) {
    const scatterDirection = hit.normal.add(Vec3.randomUnitVector());
    const scattered = new Ray(hit.point, scatterDirection);

    return {
      attenuation: this.albedo,
      ray: scattered,
    };
  }
}
