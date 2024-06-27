import Asset from '../data/asset.js';

export const testInput1 = {
  type: 'Crypto',
  ticker: 'BTC-USD',
  shares: 0.010851,
  totalCost: 732.33,
};

export const testInput2 = {
  type: 'Crypto',
  ticker: 'ALGO-USD',
  shares: 1324.488921,
  totalCost: 265.56,
};

export const testInput3 = {
  type: 'Stock',
  ticker: 'AAPL',
  shares: 0.643900,
  totalCost: 110.35,
};

export const testInput4 = {
  type: 'Stock',
  ticker: 'PLTR',
  shares: 4.363000,
  totalCost: 100.35,
};

export const testInput5 = {
  type: 'Stock',
  ticker: 'SOFI',
  shares: 13.989600,
  totalCost: 100.31,
};

export const testInput6 = {
  type: 'Stock',
  ticker: 'AMD',
  shares: 0.636900,
  totalCost: 99.35,
};

export const testInput7 = {
  type: 'Stock',
  ticker: 'WFC',
  shares: 1.705100,
  totalCost: 100.29,
};

export const testInput8 = {
  type: 'Stock',
  ticker: 'DIS',
  shares: 0.977400,
  totalCost: 99.31,
};

const asset1 = new Asset(testInput1);
const asset2 = new Asset(testInput2);
const asset3 = new Asset(testInput3);
const asset4 = new Asset(testInput4);
const asset5 = new Asset(testInput5);
const asset6 = new Asset(testInput6);
const asset7 = new Asset(testInput7);
const asset8 = new Asset(testInput8);