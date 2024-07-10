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
    this.#totalInvestedCell.innerText = format.dollars(portfolio.totalInvested);
    this.#unrealizedPnlCell.innerText = format.profitLoss(portfolio.totalProfitLoss);
    this.#unrealizedPnlPctCell.innerText = format.pct(portfolio.totalProfitLossPct, true);
    this.#cashCell.innerText = format.dollars(portfolio.cashBalance);
    this.#portfolioValueCell.innerText = format.dollars(portfolio.totalPortfolioValue);

    // Format unrealized profit or loss with green or red
    this.#unrealizedPnlCell.classList.toggle('js-negative-number', portfolio.totalProfitLoss < 0);
    this.#unrealizedPnlCell.classList.toggle('js-positive-number', portfolio.totalProfitLoss > 0);
    this.#unrealizedPnlPctCell.classList.toggle('js-negative-number', portfolio.totalProfitLoss < 0);
    this.#unrealizedPnlPctCell.classList.toggle('js-positive-number', portfolio.totalProfitLoss > 0);
  }
}

export default Summary;
