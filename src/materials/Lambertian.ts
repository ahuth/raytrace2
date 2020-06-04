import Material from '../Material';
import Ray from '../Ray';
import Vec3 from '../Vec3';
import type Color from '../Color';
import type HitRecord from '../HitRecord';

/**
 * A diffuse (matte) material using Lambertian reflection.
 */
export default class Lambertian extends Material {
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

// TODO: Introduce a material for this previous optimization.

// Bounce the ray in a random direction, to give a diffuse (matte) appearance to the hit
// object.
// const target = hit.point.add(Point.randomInHemisphere(hit.normal));
// const ray = new Ray(hit.point, target.subtract(hit.point))
//   .color(world, bouncesRemaining - 1)
//   .scaleUp(0.5);

// The `scaleUp` operations return a Vec3, not a Color. Get around that by explicitly
// instantiating a new Color object.
// return new Color(ray.x, ray.y, ray.z);
