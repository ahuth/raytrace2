import Color from '../../Color';
import LambertianMatte from '../../materials/LambertianMatte';
import Point from '../../Point';
import Ray from '../../Ray';
import Sphere from '../Sphere';
import Vec3 from '../../Vec3';

const matteBlack = new LambertianMatte(new Color(0, 0, 0));

test('creation', () => {
  const sphere = new Sphere(
    new Point(4, 5, 6),
    7,
    matteBlack,
  );

  expect(sphere.center).toEqual(expect.objectContaining({
    x: 4, y: 5, z: 6,
  }));

  expect(sphere.radius).toEqual(7);
});

describe('hit', () => {
  test('a miss', () => {
    const ray = new Ray(
      new Point(0, 0, 0),
      new Vec3(0, 0, 0),
    );

    const sphere = new Sphere(
      new Point(4, 5, 6),
      7,
      matteBlack,
    );

    expect(sphere.hit(ray, 0, 10)).toEqual(null);
  });

  test('a hit', () => {
    const ray = new Ray(
      new Point(0, 0, 0),
      new Vec3(4, 5, 7),
    );

    const sphere = new Sphere(
      new Point(4, 5, 6),
      7,
      matteBlack,
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hit = sphere.hit(ray, 0, 10)!;
    expect(hit.time).toBeCloseTo(0.1878);
  });
});
