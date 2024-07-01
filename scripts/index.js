import Portfolio from './data/portfolio.js';
import PortfolioTable from './components/portfolioTable.js';
import Summary from './components/summary.js';
import storage from './utils/storage.js';
import marketData from './data/marketData.js';
import { submitTestInput } from './tests/testInputs.js';

const portfolio = new Portfolio();
const portfolioTable = new PortfolioTable;
const summary = new Summary;

portfolioTable.renderAssets(portfolio);
summary.render(portfolio);

document.querySelector('.js-add-asset')
  .addEventListener('click', async () => {
    submitTestInput(portfolio, marketData, portfolioTable, summary);
  });