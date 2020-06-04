import Color from '../Color';

test('creation', () => {
  const color = new Color(0.2, 0.88, 1);
  expect(color.r).toEqual(0.2);
  expect(color.g).toEqual(0.88);
  expect(color.b).toEqual(1);
});

test('toString', () => {
  const color = new Color(0.2, 0.88, 1);
  expect(color.toString()).toEqual('114 240 255');
});
