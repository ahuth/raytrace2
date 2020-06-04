import Vec3 from '../Vec3';

test('creation', () => {
  const vec = new Vec3(1, 2, 3);
  expect(vec.x).toEqual(1);
  expect(vec.y).toEqual(2);
  expect(vec.z).toEqual(3);
});

test('negation', () => {
  const vec = new Vec3(2, 4, 6);
  const negated = vec.negate();
  expect(negated.x).toEqual(-2);
  expect(negated.y).toEqual(-4);
  expect(negated.z).toEqual(-6);
});

test('inversion', () => {
  const vec = new Vec3(2, 4, 6);
  const inverted = vec.invert();
  expect(inverted.x).toBeCloseTo(0.5);
  expect(inverted.y).toBeCloseTo(0.25);
  expect(inverted.z).toBeCloseTo(0.167);
});

test('addition', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const added = a.add(b);
  expect(added.x).toEqual(-1);
  expect(added.y).toEqual(6);
  expect(added.z).toEqual(2);
});

test('subtraction', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const subtracted = a.subtract(b);
  expect(subtracted.x).toEqual(3);
  expect(subtracted.y).toEqual(-2);
  expect(subtracted.z).toEqual(-8);
});

test('multiplication', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const multiplied = a.multiply(b);
  expect(multiplied.x).toEqual(-2);
  expect(multiplied.y).toEqual(8);
  expect(multiplied.z).toEqual(-15);
});

test('division', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const divided = a.divide(b);
  expect(divided.x).toBeCloseTo(-0.5);
  expect(divided.y).toBeCloseTo(0.5);
  expect(divided.z).toBeCloseTo(-0.6);
});

test('dot product', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const dotProduct = a.dotProduct(b);
  expect(dotProduct).toEqual(-9);
});

test('cross product', () => {
  const a = new Vec3(1, 2, -3);
  const b = new Vec3(-2, 4, 5);
  const crossProduct = a.crossProduct(b);
  expect(crossProduct.x).toEqual(22);
  expect(crossProduct.y).toEqual(1);
  expect(crossProduct.z).toEqual(8);
});

test('scaling up', () => {
  const vec = new Vec3(5, 3, 2);
  const scaled = vec.scaleUp(3);
  expect(scaled.x).toEqual(15);
  expect(scaled.y).toEqual(9);
  expect(scaled.z).toEqual(6);
});

test('scaling down', () => {
  const vec = new Vec3(8, 3, 6);
  const scaled = vec.scaleDown(2);
  expect(scaled.x).toEqual(4);
  expect(scaled.y).toEqual(1.5);
  expect(scaled.z).toEqual(3);
});

test('length', () => {
  const vec = new Vec3(2, 2, 6);
  expect(vec.length()).toBeCloseTo(6.632);
});

test('toString', () => {
  const vec = new Vec3(1, 2, 3);
  expect(vec.toString()).toEqual('1 2 3');
});

test('unit vector', () => {
  const vec = new Vec3(2, 7, 3);
  const unit = vec.unit();
  expect(unit.x).toBeCloseTo(0.254);
  expect(unit.y).toBeCloseTo(0.889);
  expect(unit.z).toBeCloseTo(0.381);
});

test('reflection', () => {
  const vec = new Vec3(2, 7, 3);
  const normal = new Vec3(1, -1, 0);
  const reflected = vec.reflect(normal);
  expect(reflected.x).toBeCloseTo(12);
  expect(reflected.y).toBeCloseTo(-3);
  expect(reflected.z).toBeCloseTo(3);
});
