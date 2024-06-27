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
  }
}

export default Portfolio;