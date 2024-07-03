import Portfolio from './data/portfolio.js';
import PortfolioTable from './components/portfolioTable.js';
import Summary from './components/summary.js';
import marketData from './data/marketData.js';
import Popup from './components/popup.js';
import { submitTestInput } from './tests/testInputs.js';

const portfolio = new Portfolio();
const portfolioTable = new PortfolioTable;
export const summary = new Summary;

portfolioTable.renderAssets(portfolio, summary);
summary.render(portfolio);

document.querySelector('.js-add-asset')
  .addEventListener('click', () => {
    submitTestInput(portfolio, marketData, portfolioTable, summary);
  });

document.querySelector('.js-edit-cash')
  .addEventListener('click', () => {

  });

document.querySelector('.js-reset-portfolio')
  .addEventListener('click', () => {
    portfolio.reset();
  });