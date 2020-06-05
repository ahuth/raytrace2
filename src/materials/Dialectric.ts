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

    // Check if refraction is possible. If not, use reflection.
    if (etaI_over_etaT * sineTheta > 1) {
      const reflected = ray.direction.reflect(hit.normal);
      const scattered = new Ray(hit.point, reflected);

      return { attenuation, ray: scattered };
    }

    const probabilityOfReflection = schlick(cosineTheta, etaI_over_etaT);

    // Based on the angle and material, there's a chance that the ray will be reflected and not
    // refracted.
    if (Math.random() < probabilityOfReflection) {
      const reflected = ray.direction.reflect(hit.normal);
      const scattered = new Ray(hit.point, reflected);

      return { attenuation, ray: scattered };
    }

    const refracted = ray.direction.refract(hit.normal, etaI_over_etaT);
    const scattered = new Ray(hit.point, refracted);

    return { attenuation, ray: scattered };
  }
}

/**
 * Schlick approximation.
 * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
 */
function schlick(cosine: number, refractiveIndex: number) {
  const r0 = (1 - refractiveIndex) / (1 + refractiveIndex);
  const r0_squared = r0 * r0;
  return r0_squared + (1 - r0_squared) * Math.pow(1 - cosine, 5);
}
