import valid from '../utils/validate.js';

test('Zero returns true', () => {
  expect(valid.cashInput(0)).toBe(true);
});

test('Positive number returns true', () => {
  expect(valid.cashInput(100)).toBe(true);
});

test('Negative number returns false', () => {
  expect(valid.cashInput(-100)).toBe(false);
});

test('String number returns true', () => {
  expect(valid.cashInput("100")).toBe(true);
});

test('String with letters returns false', () => {
  expect(valid.cashInput("100abc")).toBe(false);
});

test('Empty string returns false', () => {
  expect(valid.cashInput("")).toBe(false);
});

test('Undefined returns false', () => {
  expect(valid.cashInput(undefined)).toBe(false);
});

test('Floating point number returns true', () => {
  expect(valid.cashInput(100.50)).toBe(true);
});

test('String with floating point number returns true', () => {
  expect(valid.cashInput("100.50")).toBe(true);
});

test('NaN returns false', () => {
  expect(valid.cashInput(NaN)).toBe(false);
});