import Portfolio from './data/portfolio.js';
import PortfolioTable from './components/portfolioTable.js';
import Summary from './components/summary.js';
import EditCash from './components/popups/editCashPopup.js';
import { ResetPorftolio } from './components/popups/prompts.js';
import Asset from './data/asset.js';
import marketData from './data/marketData.js';
import apiKeyCheck from './utils/apiKeyCheck.js';
import { ApiKeyPrompt } from './components/popups/apiKeyPopup.js';

export const portfolio = new Portfolio();
export const portfolioTable = new PortfolioTable;
export const summary = new Summary;

portfolioTable.renderAssets(portfolio, summary);
summary.render(portfolio);
apiKeyCheck();

document.querySelector('.js-add-asset')
  .addEventListener('click', () => {
    if (!apiKeyCheck()) return;
    window.location.href = 'add-asset.html';
  });

document.querySelector('.js-edit-cash')
  .addEventListener('click', () => {
    new EditCash(portfolio);
  });

document.querySelector('.js-edit-api-key')
  .addEventListener('click', () => {
    new ApiKeyPrompt;
  });

document.querySelector('.js-update-market-data')
  .addEventListener('click', async () => {
    if (!apiKeyCheck() || portfolio.assets.length === 0) return;

    await marketData.getMultiQuote(portfolio);
    
    portfolio.assets.forEach(asset => {
      const { ticker, totalCost, shares } = asset;
      const handleAssetInput = new Asset({ ticker, totalCost, shares });
      portfolio.replaceAsset(handleAssetInput);
    });
    
    window.location.reload();
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
