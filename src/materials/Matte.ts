import Material from '../Material';
import Point from '../Point';
import Ray from '../Ray';
import type Color from '../Color';
import type HitRecord from '../HitRecord';

/**
 * A diffuse (matte) material. Uses a different method than the Lambertian material to achieve that.
 * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/analternativediffuseformulation
 */
export default class Matte extends Material {
  albedo: Color;

  constructor(albedo: Color) {
    super();
    this.albedo = albedo;
  }

  scatter(_ray: Ray, hit: HitRecord) {
    const target = hit.point.add(Point.randomInHemisphere(hit.normal));
    const scatterDirection = target.subtract(hit.point);
    const scattered = new Ray(hit.point, scatterDirection);

    return {
      attenuation: this.albedo,
      ray: scattered,
    };
  }
}
