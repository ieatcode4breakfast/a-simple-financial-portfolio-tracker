import storage from '../utils/storage.js';

class Portfolio {
  assets; // Contains the assets that are added to the portfolio
  totalInvested;
  totalProfitLoss
  totalProfitLossPct;
  cashBalance;
  cashBalancePct;
  totalPortfolioValue;
  lastPropertySorted;
  lastPropertySortedHeader;
  sortAscending;
  #assetsTotalValue;

  constructor() {
    const portfolioData = storage.get('portfolioData') || {};
    this.assets = portfolioData.assets || [];
    this.cashBalance = portfolioData.cashBalance || 0;
    this.sortAscending = false;

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
    storage.remove('marketData');
    window.location.reload();
  }

  update() {
    this.#calculateTotals();
    storage.set('portfolioData', this);
  }

  search(ticker) {
    return this.assets.find(asset => asset.ticker === ticker);
  }

  sortAssets(header) {
    if (this.assets.length === 0) {
      return;
    }

    // Determines which property to sort by such as asset ticker, name, type, and so on...
    const { sortBy } = header.dataset;

    const sortStrings = isNaN(this.assets[0][sortBy]); // Determine if the values being sorted are not numbers

    // Triggers when a new property is being sorted
    // If strings are being sorted, the default is to sort by ascending order
    // If numbers are being sorted, the default is to sort by descending order
    if (this.lastPropertySorted !== sortBy) {
      this.sortAscending = sortStrings; // if sortStrings is true, then sortAscending is true
    }
    
    if (sortStrings) {
      this.assets = this.sortAscending
        ? this.assets.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : this.assets.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
    } else {
      this.assets = this.sortAscending
        ? this.assets.sort((a, b) => a[sortBy] - b[sortBy])
        : this.assets.sort((a, b) => b[sortBy] - a[sortBy]);
    }

    this.sortAscending = !this.sortAscending;
    this.lastPropertySorted = sortBy;
    this.lastPropertySortedHeader = header;
  }

  editAsset(assetId) {
    const toEdit = this.assets.find(asset => asset.id === assetId);
    storage.set('toEdit', toEdit);
  }

  #calculateTotals() {
    this.#resetTotals(); // Reset totals prior to recalculating

    this.assets.forEach((asset, index) => {
      asset.id = `asset-${index + 1}`; // The asset ID will be the basis for removing assets
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

  // Calculates the % allocated to each asset
  // This can only be performed after the total portfolio value has been determined
  #calculateAssetPct() {
    this.cashBalancePct = this.totalPortfolioValue === 0 ? 0 : this.cashBalance / this.totalPortfolioValue;
    this.assets.forEach(asset => {
      asset.pctOfPortfolio = this.totalPortfolioValue === 0 ? 0 : asset.currentValue / this.totalPortfolioValue;
    });
  }
}

export default Portfolio;