import Point from '../Point';
import Ray from '../Ray';
import Vec3 from '../Vec3';

test('creation', () => {
  const origin = new Point(2, 0, 3);
  const direction = new Vec3(5, 7, -4);
  const ray = new Ray(origin, direction);
  expect(ray.origin).toEqual(origin);
  expect(ray.direction).toEqual(direction);
});

test('at', () => {
  const origin = new Point(2, 0, 3);
  const direction = new Vec3(5, 7, -4);
  const ray = new Ray(origin, direction);
  expect(ray.at(0)).toEqual(expect.objectContaining({ x: 2, y: 0, z: 3 }));
  expect(ray.at(1)).toEqual(expect.objectContaining({ x: 7, y: 7, z: -1 }));
  expect(ray.at(2)).toEqual(expect.objectContaining({ x: 12, y: 14, z: -5 }));
});
