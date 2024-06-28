import Asset from '../data/asset.js';
import { portfolio, portfolioTable, summary } from '../index.js';

export const testInput1 = {
  type: 'Crypto',
  ticker: 'BTC-USD',
  shares: 0.01085,
  totalCost: 732.33,
};

export const testInput2 = {
  type: 'Crypto',
  ticker: 'ALGO-USD',
  shares: 1324.48,
  totalCost: 265.56,
};

export const testInput3 = {
  type: 'Stock',
  ticker: 'AAPL',
  shares: 0.6439,
  totalCost: 110.35,
};

export const testInput4 = {
  type: 'Stock',
  ticker: 'PLTR',
  shares: 4.363,
  totalCost: 100.35,
};

export const testInput5 = {
  type: 'Stock',
  ticker: 'SOFI',
  shares: 13.98,
  totalCost: 100.31,
};

export const testInput6 = {
  type: 'Stock',
  ticker: 'AMD',
  shares: 0.6369,
  totalCost: 99.35,
};

export const testInput7 = {
  type: 'Stock',
  ticker: 'WFC',
  shares: 1.705,
  totalCost: 100.29,
};

export const testInput8 = {
  type: 'Stock',
  ticker: 'DIS',
  shares: 0.9774,
  totalCost: 99.31,
};

export const testInput9 = {
  type: 'Stock',
  ticker: 'GOOG',
  shares: 2.54,
  totalCost: 338.95,
};

export const testInput10 = {
  type: 'Stock',
  ticker: 'AMZN',
  shares: 0.874,
  totalCost: 170.12,
};

export const testInput11 = {
  type: 'Stock',
  ticker: 'TSLA',
  shares: 1.25,
  totalCost: 244.54,
};

export const testInput12 = {
  type: 'Stock',
  ticker: 'NVDA',
  shares: 1.85,
  totalCost: 230.04,
};

export const testInput13 = {
  type: 'Stock',
  ticker: 'CCL',
  shares: 10.25,
  totalCost: 189.18,
};

export const testInput14 = {
  type: 'Stock',
  ticker: 'MU',
  shares: 3.45,
  totalCost: 488.76,
};

export const testInput15 = {
  type: 'Stock',
  ticker: 'F',
  shares: 8.75,
  totalCost: 105.35,
};

export const testInput16 = {
  type: 'Stock',
  ticker: 'CMG',
  shares: 0.75,
  totalCost: 49.36,
};

export const testInput17 = {
  type: 'Stock',
  ticker: 'PFE',
  shares: 5.95,
  totalCost: 163.08,
};

async function submitAssetTest(input) {
  const asset = new Asset(input);
  await asset.processAssetData();
  portfolio.assets.push(asset);
  portfolio.calculateTotals();
}

(async () => {
  await submitAssetTest(testInput1);
  await submitAssetTest(testInput2);
  await submitAssetTest(testInput3);
  await submitAssetTest(testInput4);
  await submitAssetTest(testInput5);
  await submitAssetTest(testInput6);
  await submitAssetTest(testInput7);
  await submitAssetTest(testInput8);
  await submitAssetTest(testInput9);
  await submitAssetTest(testInput10);
  await submitAssetTest(testInput11);
  await submitAssetTest(testInput12);
  await submitAssetTest(testInput13);
  await submitAssetTest(testInput14);
  await submitAssetTest(testInput15);
  await submitAssetTest(testInput16);
  await submitAssetTest(testInput17);
  
  console.log(portfolio);
  portfolioTable.renderAssets(portfolio);
  summary.render(portfolio);
})();
