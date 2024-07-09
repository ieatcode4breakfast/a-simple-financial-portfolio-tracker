import Portfolio from './data/portfolio.js';
import PortfolioTable from './components/portfolioTable.js';
import Summary from './components/summary.js';
import EditCash from './components/popups/editCashPopup.js';
import { ResetPorftolio } from './components/popups/prompts.js';
import marketData from './data/marketData.js';
import { submitTestInput } from './tests/testInputs.js';

export const portfolio = new Portfolio();
export const portfolioTable = new PortfolioTable;
export const summary = new Summary;

portfolioTable.renderAssets(portfolio, summary);
summary.render(portfolio);

document.querySelector('.js-add-asset')
  .addEventListener('click', () => {
    window.location.href = 'add-asset.html';
    //submitTestInput(portfolio, marketData, portfolioTable, summary);
  });

document.querySelector('.js-edit-cash')
  .addEventListener('click', () => {
    new EditCash(portfolio);
  });

document.querySelector('.js-update-market-data')
  .addEventListener('click', () => {
    marketData.getMultiQuote(portfolio);
  });

document.querySelector('.js-reset-portfolio')
  .addEventListener('click', () => {
    new ResetPorftolio(portfolio);
  });

document.querySelectorAll('.js-portfolio-table th:not(.js-remove-icons-header)')
  .forEach(header => {
    header.addEventListener('click', () => {
      portfolio.sortAssets(header);
      portfolioTable.renderAssets(portfolio, summary);
    });
  });