import mockFetch from '../tests/mockFetch.js';

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
    this.type = assetInput.type;
    this.ticker = assetInput.ticker;
    this.totalCost = assetInput.totalCost;
    this.shares = assetInput.shares;
  }

  async processAssetData() {
    try {
      const liveData = await mockFetch(this.ticker);

      this.name = liveData.name;
      this.lastPrice = liveData.lastPrice;
      this.currentValue = this.shares * this.lastPrice;
      this.averagePrice = this.totalCost / this.shares;
      this.profitLoss = this.currentValue - this.totalCost;
      this.profitLossPct = this.profitLoss / this.totalCost;
      this.lastPriceDecimals = this.#countDecimals(this.lastPrice);

    } catch (error) {
      console.error(`An error occurred while processing data for ticker symbol ${this.ticker}`, error);
    }
  }

  #countDecimals(num) {
    if (num.toString().includes('.')) {
      return num.toString().split('.')[1].length
    } else {
      return 0;
    }
  }
}

export default Asset;