// This module is for test inputs

import {addPosition} from './positions.js';

export const testInput1 = {
  assetType: 'Crypto',
  ticker: 'BTC',
  positionName: 'Bitcoin',
  totalCostCents: 73233,
  shares: 0.010851,
  lastPriceCents: 6421931
};

export const testInput2 = {
  assetType: 'Crypto',
  ticker: 'ALGO',
  positionName: 'Algorand',
  totalCostCents: 26556,
  shares: 1324.48,
  lastPriceCents: 19.75
};

export const testInput3 = {
  assetType: 'Stock',
  ticker: 'GOOG',
  positionName: 'Alphabet',
  totalCostCents: 10022,
  shares: 0.752,
  lastPriceCents: 16901
};

export const testInput4 = {
  assetType: 'Stock',
  ticker: 'AAPL',
  positionName: 'Apple',
  totalCostCents: 11035,
  shares: 0.6439,
  lastPriceCents: 18336
};

export function submitTestInputs() { // Adds the test inputs into the portfolio
  addPosition(testInput1);
  addPosition(testInput2);
  addPosition(testInput3);
  addPosition(testInput4);
}