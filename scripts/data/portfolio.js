import storage from '../utils/storage.js';

class Portfolio {
  assets;
  totalInvested;
  totalProfitLoss
  totalProfitLossPct;
  cashBalance;
  cashBalancePct;
  totalPortfolioValue;
  #assetsTotalValue;

  constructor() {
    const portfolioData = storage.get('portfolioData') || {};
    this.assets = portfolioData.assets || [];
    this.cashBalance = portfolioData.cashBalance || 121.45;

    this.#calculateTotals();
  }

  addAsset(asset) {
    this.assets.push(asset);
    this.update();
  }

  removeAsset(assetId) {
    this.assets = this.assets.filter(asset => asset.id !== assetId);
    this.update();
  }

  reset() {
    storage.remove('portfolioData');
    window.location.reload();
  }

  update() {
    this.#calculateTotals();
    storage.set('portfolioData', this);
  }

  #calculateTotals() {
    this.#resetTotals();

    this.assets.forEach((asset, index) => {
      asset.id = `asset-${index + 1}`;
      this.totalInvested += asset.totalCost;
      this.#assetsTotalValue += asset.currentValue;
      this.totalProfitLoss += asset.profitLoss;
    });

    this.totalPortfolioValue = this.#assetsTotalValue + this.cashBalance;
    this.totalProfitLossPct = this.#assetsTotalValue === 0 ? 0 : this.totalProfitLoss / (this.#assetsTotalValue + this.cashBalance);
    this.cashBalancePct = this.#assetsTotalValue === 0 ? 0 : this.cashBalancePct / this.totalPortfolioValue;

    this.#calculateAssetPct();
  }

  #resetTotals() {
    this.totalInvested = 0;
    this.totalProfitLoss = 0;
    this.#assetsTotalValue = 0;
  }

  #calculateAssetPct() {
    this.cashBalancePct = this.totalPortfolioValue === 0 ? 0 : this.cashBalance / this.totalPortfolioValue;
    this.assets.forEach(asset => {
      asset.pctOfPortfolio = this.totalPortfolioValue === 0 ? 0 : asset.currentValue / this.totalPortfolioValue;
    });
  }
}

export default Portfolio;