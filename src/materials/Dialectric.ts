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

  /**
   * Note that the book implements this in https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/snell'slaw.
   * However, I think there's a bug in it. I can't see how Listing 50 would have a vec3 for
   * `r_out_perp`, since each term is a number.
   *
   * Instead, I've used the entry from https://www.realtimerendering.com/raytracing/Ray%20Tracing%20in%20a%20Weekend.pdf.
   */
  scatter(ray: Ray, hit: HitRecord) {
    const etaI_over_etaT = hit.frontFace ? 1 / this.refractiveIndex : this.refractiveIndex;
    const refracted = ray.direction.refract(hit.normal, etaI_over_etaT);
    const reflected = ray.direction.reflect(hit.normal);
    const scattered = new Ray(hit.point, refracted || reflected);

    return {
      // Attenuation is 1, 1, 1, because the surface absorbs nothing.
      attenuation: new Color(1, 1, 1),
      ray: scattered,
    };
  }
}
