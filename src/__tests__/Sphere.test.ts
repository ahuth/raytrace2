import Point from '../Point';
import Ray from '../Ray';
import Sphere from '../Sphere';
import Vec3 from '../Vec3';

test('creation', () => {
  const sphere = new Sphere(
    new Point(4, 5, 6),
    7,
  );

  expect(sphere.center).toEqual(expect.objectContaining({
    x: 4, y: 5, z: 6,
  }));

  expect(sphere.radius).toEqual(7);
});

describe('isIntersectedBy', () => {
  test('a miss', () => {
    const ray = new Ray(
      new Point(0, 0, 0),
      new Vec3(0, 0, 0),
    );

    const sphere = new Sphere(
      new Point(4, 5, 6),
      7,
    );

    expect(sphere.isIntersectedBy(ray)).toEqual(false);
  });

  test('a hit', () => {
    const ray = new Ray(
      new Point(0, 0, 0),
      new Vec3(4, 5, 7),
    );

    const sphere = new Sphere(
      new Point(4, 5, 6),
      7,
    );

    expect(sphere.isIntersectedBy(ray)).toEqual(true);
  });
});
