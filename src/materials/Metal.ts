import Material from '../Material';
import Point from '../Point';
import Ray from '../Ray';
import type Color from '../Color';
import type HitRecord from '../HitRecord';

/**
 * A metal material using reflection.
 */
export default class Metal extends Material {
  albedo: Color;
  fuzziness: number;

  constructor(albedo: Color, fuzziness = 0) {
    super();
    this.albedo = albedo;
    this.fuzziness = fuzziness;
  }

  scatter(ray: Ray, hit: HitRecord) {
    const reflected = ray.direction.unit().reflect(hit.normal);

    // Add any "fuziness" to the reflection. This essentially slightly randomizes the reflection,
    // instead of perfectly reflecting the ray.
    const fuzz = Point.randomInUnitSphere().scaleUp(this.fuzziness);

    const scattered = new Ray(hit.point, reflected.add(fuzz));

    if (scattered.direction.dotProduct(hit.normal) <= 0) {
      return null;
    }

    return {
      attenuation: this.albedo,
      ray: scattered,
    };
  }
}
