import Portfolio from './data/portfolio.js';
import PortfolioTable from './components/portfolioTable.js';
import Summary from './components/summary.js';

export const portfolio = new Portfolio;
export const portfolioTable = new PortfolioTable;
export const summary = new Summary;

portfolioTable.renderAssets(portfolio);
summary.render(portfolio);

console.log(portfolio);