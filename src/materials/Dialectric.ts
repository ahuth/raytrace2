/* eslint-disable camelcase */
import Color from '../Color';
import Material from '../Material';
import Ray from '../Ray';
import type HitRecord from '../HitRecord';

/**
 * A clear material with refraction.
 */
export default class Dialectric extends Material {
  refractiveIndex: number

  constructor(refractiveIndex: number) {
    super();
    this.refractiveIndex = refractiveIndex;
  }

  scatter(ray: Ray, hit: HitRecord) {
    // Attenuation is always 1, 1, 1, because the surface absorbs nothing.
    const attenuation = new Color(1, 1, 1);

    const etaI_over_etaT = hit.frontFace ? 1 / this.refractiveIndex : this.refractiveIndex;
    const cosineTheta = Math.min(ray.direction.unit().negate().dotProduct(hit.normal), 1);
    const sineTheta = Math.sqrt(1 - cosineTheta * cosineTheta);

    if (etaI_over_etaT * sineTheta > 1) {
      // Refraction is not possible. Use reflection, instead.
      const reflected = ray.direction.reflect(hit.normal);
      const scattered = new Ray(hit.point, reflected);

      return { attenuation, ray: scattered };
    }

    const refracted = ray.direction.refract(hit.normal, etaI_over_etaT);
    const scattered = new Ray(hit.point, refracted);

    return { attenuation, ray: scattered };
  }
}
