import format from './format.js'

class Summary {
  #totalInvestedCell;
  #unrealizedPnlCell;
  #unrealizedPnlPctCell;
  #cashCell;
  #portfolioValueCell;
  
  constructor() {
    this.#totalInvestedCell = document.querySelector('.js-total-invested');
    this.#unrealizedPnlCell = document.querySelector('.js-unrealized-profitloss');
    this.#unrealizedPnlPctCell = document.querySelector('.js-unrealized-profitloss-pct');
    this.#cashCell = document.querySelector('.js-summary-cash');
    this.#portfolioValueCell = document.querySelector('.js-porfolio-value');
  }

  render(portfolio) {
    const profitLossClass = format.profitLossClass(portfolio.totalProfitLoss);
    this.#totalInvestedCell.innerText = format.dollars(portfolio.totalInvested);
    this.#unrealizedPnlCell.classList.add(`${profitLossClass}`);
    this.#unrealizedPnlCell.innerText = format.profitLoss(portfolio.totalProfitLoss);
    this.#unrealizedPnlPctCell.classList.add(`${profitLossClass}`);
    this.#unrealizedPnlPctCell.innerText = format.pct(portfolio.totalProfitLossPct, true);
    this.#cashCell.innerText = format.dollars(portfolio.cashBalance);
    this.#portfolioValueCell.innerText = format.dollars(portfolio.totalPortfolioValue);
  }
}

export default Summary;