import Color from './Color';
import Hittables from './Hittables';
import Point from './Point';
import random from './random';
import { Dialectric, LambertianMatte, Metal } from './materials';
import { Sphere } from './objects';

export default function randomScene(): Hittables {
  const world = new Hittables();

  const groundMaterial = new LambertianMatte(new Color(0.5, 0.5, 0.5));
  const ground = new Sphere(new Point(0, -1000, 0), 1000, groundMaterial);
  world.add(ground);

  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const chooseMaterial = Math.random();
      const center = new Point(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random(),
      );

      if (center.subtract(new Point(4, 0.2, 0)).length() > 0.9) {
        if (chooseMaterial < 0.8) {
          world.add(createDiffuse(center));
        } else if (chooseMaterial < 0.95) {
          world.add(createMetal(center));
        } else {
          world.add(createGlass(center));
        }
      }
    }
  }

  const material1 = new Dialectric(1.5);
  const sphere1 = new Sphere(new Point(0, 1, 0), 1, material1);
  world.add(sphere1);

  const material2 = new LambertianMatte(new Color(0.4, 0.2, 0.1));
  const sphere2 = new Sphere(new Point(-4, 1, 0), 1, material2);
  world.add(sphere2);

  const material3 = new Metal(new Color(0.7, 0.6, 0.5), 0);
  const sphere3 = new Sphere(new Point(4, 1, 0), 1, material3);
  world.add(sphere3);

  return world;
}

function createDiffuse(location: Point) {
  const albedo = Color.fromVec3(Color.random().multiply(Color.random()));
  const sphereMaterial = new LambertianMatte(albedo);

  return new Sphere(location, 0.2, sphereMaterial);
}

function createMetal(location: Point) {
  const albedo = Color.fromVec3(Color.random(0.5, 1));
  const fuzz = random(0, 0.5);
  const sphereMaterial = new Metal(albedo, fuzz);

  return new Sphere(location, 0.2, sphereMaterial);
}

function createGlass(location: Point) {
  const sphereMaterial = new Dialectric(1.5);

  return new Sphere(location, 0.2, sphereMaterial);
}
