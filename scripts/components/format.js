export function profitLossStyle(num) {
  if (num > 0) {
    return 'js-positive-number';

  } else if (num < 0) {
    return 'js-negative-number';

  } else {
    return '';
  }
}