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
    const etaI_over_etaT = hit.frontFace ? 1 / this.refractiveIndex : this.refractiveIndex;
    const refracted = ray.direction.refract(hit.normal, etaI_over_etaT);
    const scattered = new Ray(hit.point, refracted);

    return {
      // Attenuation is 1, 1, 1, because the surface absorbs nothing.
      attenuation: new Color(1, 1, 1),
      ray: scattered,
    };
  }
}
