import format from '../components/format';

test('Correctly outputs zero to $0.00', () => {
  expect(format.dollars(0)).toBe('$0.00');
});