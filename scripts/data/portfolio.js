class Portfolio {
  assets;
  totalInvested;
  totalProfitLoss
  totalProfitLossPct;
  cashBalance;
  totalPortfolioValue;
  #assetsTotalValue;

  constructor() {
    this.assets = [];
    this.totalInvested = 0;
    this.totalProfitLoss = 0;
    this.totalProfitLossPct = 0;
    this.cashBalance = 0;
    this.totalPortfolioValue = 0;
    this.#assetsTotalValue = 0;
  }

  calculateTotals() {
    this.#resetTotals();

    this.assets.forEach((asset, index) => {
      asset.id = `asset-${index + 1}`;
      this.totalInvested += asset.totalCost;
      this.#assetsTotalValue += asset.currentValue;
      this.totalProfitLoss += asset.profitLoss;
    });

    this.totalPortfolioValue = this.#assetsTotalValue + this.cashBalance;
    this.totalProfitLossPct = this.totalProfitLoss / (this.#assetsTotalValue + this.cashBalance);

    this.#calculateAssetPct();
  }

  #resetTotals() {
    this.totalInvested = 0;
    this.totalProfitLoss = 0;
    this.#assetsTotalValue = 0;
  }

  #calculateAssetPct() {
    this.assets.forEach(asset=> {
      asset.pctOfPortfolio = asset.currentValue / this.totalPortfolioValue;
    });
  }
}

export default Portfolio;