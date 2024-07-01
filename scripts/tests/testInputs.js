import Asset from '../data/asset.js';

export const testInputs = [
  {
    type: 'Crypto',
    ticker: 'BTC-USD',
    shares: 0.01085,
    totalCost: 732.33,
  },
  {
    type: 'Crypto',
    ticker: 'ALGO-USD',
    shares: 1324.48,
    totalCost: 265.56,
  },
  {
    type: 'Stock',
    ticker: 'AAPL',
    shares: 0.6439,
    totalCost: 110.35,
  },
  {
    type: 'Stock',
    ticker: 'PLTR',
    shares: 4.363,
    totalCost: 100.35,
  },
  {
    type: 'Stock',
    ticker: 'SOFI',
    shares: 13.98,
    totalCost: 100.31,
  },
  {
    type: 'Stock',
    ticker: 'AMD',
    shares: 0.6369,
    totalCost: 99.35,
  },
  {
    type: 'Stock',
    ticker: 'WFC',
    shares: 1.705,
    totalCost: 100.29,
  },
  {
    type: 'Stock',
    ticker: 'DIS',
    shares: 0.9774,
    totalCost: 99.31,
  },
  {
    type: 'Stock',
    ticker: 'GOOG',
    shares: 2.54,
    totalCost: 338.95,
  },
  {
    type: 'Stock',
    ticker: 'AMZN',
    shares: 0.874,
    totalCost: 170.12,
  },
  {
    type: 'Stock',
    ticker: 'TSLA',
    shares: 1.25,
    totalCost: 244.54,
  },
  {
    type: 'Stock',
    ticker: 'NVDA',
    shares: 1.85,
    totalCost: 230.04,
  },
  {
    type: 'Stock',
    ticker: 'CCL',
    shares: 10.25,
    totalCost: 189.18,
  },
  {
    type: 'Stock',
    ticker: 'MU',
    shares: 3.45,
    totalCost: 488.76,
  },
  {
    type: 'Stock',
    ticker: 'F',
    shares: 8.75,
    totalCost: 105.35,
  },
  {
    type: 'Stock',
    ticker: 'CMG',
    shares: 0.75,
    totalCost: 49.36,
  },
  {
    type: 'Stock',
    ticker: 'PFE',
    shares: 5.95,
    totalCost: 163.08,
  }
];

export async function submitTestInput(portfolio, marketData, portfolioTable, summary) {
  const input = testInputs[portfolio.assets.length];
  await marketData.get(input.ticker);
  const asset = new Asset(input);
  asset.processAssetData();
  portfolio.addAsset(asset);
  portfolioTable.renderAssets(portfolio);
  summary.render(portfolio);
}