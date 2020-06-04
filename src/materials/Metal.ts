import Material from '../Material';
import Ray from '../Ray';
import type Color from '../Color';
import type HitRecord from '../HitRecord';

/**
 * A metal material using reflection.
 */
export default class Metal extends Material {
  albedo: Color;

  constructor(albedo: Color) {
    super();
    this.albedo = albedo;
  }

  scatter(ray: Ray, hit: HitRecord) {
    const reflected = ray.direction.unit().reflect(hit.normal);
    const scattered = new Ray(hit.point, reflected);

    if (scattered.direction.dotProduct(hit.normal) <= 0) {
      return null;
    }

    return {
      attenuation: this.albedo,
      ray: scattered,
    };
  }
}
