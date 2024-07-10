import marketData from './marketData.js';

export class Asset {
  id;
  ticker;
  name;
  type;
  pctOfPortfolio;
  currentValue;
  totalCost;
  shares;
  averagePrice
  lastPrice;
  profitLoss;
  profitLossPct;
  lastPriceDecimals;
  
  constructor(assetInput) {
    this.ticker = assetInput.ticker;
    this.totalCost = assetInput.totalCost;
    this.shares = assetInput.shares;
    this.#processAssetData();
  }

  #processAssetData() {
    const data = marketData.search(this.ticker);
    this.name = data.name;
    this.type = data.type;
    this.lastPrice = Number(data.lastPrice);
    this.currentValue = Number(this.shares * this.lastPrice);
    this.averagePrice = Number(this.totalCost / this.shares);
    this.profitLoss = Number(this.currentValue - this.totalCost);
    this.profitLossPct = Number(this.profitLoss / this.totalCost);
    this.lastPriceDecimals = Number(this.#countDecimals(this.lastPrice));
  }

  // Count the number of decimals on the last price
  // The number of decimals on the average price will be the same as the last price
  #countDecimals(num) {
    if (num.toString().includes('.')) {
      return num.toString().split('.')[1].length
    } else {
      return 0;
    }
  }
}

export default Asset;
