// Simulate an async fetch operation

async function mockFetch(ticker) {
  return mockAssetData.find(asset => asset.ticker === ticker);
}

const mockAssetData = [
  { ticker: 'BTC-USD', name: 'Bitcoin', lastPrice: 61006.35 },
  { ticker: 'ALGO-USD', name: 'Algorand', lastPrice: 0.139765 },
  { ticker: 'GOOG', name: 'Alphabet', lastPrice: 133.27 },
  { ticker: 'AAPL', name: 'Apple', lastPrice: 213.96 },
  { ticker: 'PLTR', name: 'Palantir Technologies', lastPrice: 24.23 },
  { ticker: 'SOFI', name: 'SoFi Technologies', lastPrice: 7.17 },
  { ticker: 'AMD', name: 'Advanced Micro Devices', lastPrice: 157.07 },
  { ticker: 'DNUT', name: 'Krispy Kreme', lastPrice: 15.89 },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', lastPrice: 124.02 },
  { ticker: 'RIVN', name: 'Rivian Automotive', lastPrice: 14.53 },
  { ticker: 'TSLA', name: 'Tesla', lastPrice: 195.63 },
  { ticker: 'NIO', name: 'NIO', lastPrice: 4.585 },
  { ticker: 'AMZN', name: 'Amazon', lastPrice: 194.63 },
  { ticker: 'CCL', name: 'Carnival Corporation', lastPrice: 18.47 },
  { ticker: 'SIRI', name: 'Sirius XM Holdings', lastPrice: 2.705 },
  { ticker: 'MARA', name: 'Marathon Digital Holdings', lastPrice: 19.84 },
  { ticker: 'MU', name: 'Micron Technology', lastPrice: 141.78 },
  { ticker: 'BAC', name: 'Bank of America', lastPrice: 38.54 },
  { ticker: 'AAL', name: 'American Airlines', lastPrice: 11.16 },
  { ticker: 'F', name: 'Ford Motor Company', lastPrice: 12.02 },
  { ticker: 'NU', name: 'Nu Holdings', lastPrice: 12.64 },
  { ticker: 'LCID', name: 'Lucid Group', lastPrice: 2.62 },
  { ticker: 'CMG', name: 'Chipotle Mexican Grill', lastPrice: 65.81 },
  { ticker: 'VALE', name: 'Vale S.A.', lastPrice: 11.13 },
  { ticker: 'PFE', name: 'Pfizer', lastPrice: 27.38 },
  { ticker: 'CLSK', name: 'CleanSpark', lastPrice: 16.44 },
  { ticker: 'CHWY', name: 'Chewy', lastPrice: 30.05 },
  { ticker: 'ET', name: 'Energy Transfer', lastPrice: 15.93 },
  { ticker: 'RIOT', name: 'Riot Platforms', lastPrice: 9.21 },
  { ticker: 'T', name: 'AT&T', lastPrice: 18.7 },
  { ticker: 'WFC', name: 'Wells Fargo', lastPrice: 57.14 },
  { ticker: 'DIS', name: 'Disney', lastPrice: 102.15 }
];

export default mockFetch;