import format from './format.js';
import { summary } from '../index.js';

class PortfolioTable {
  renderAssets(portfolio) {
    const tableBody = document.querySelector('.js-table-body');

    // Reset tableBody DOM
    tableBody.innerHTML = '';

    portfolio.assets.forEach(asset => {
      const profitLossClass = format.profitLossClass(asset.profitLoss);
      tableBody.appendChild(this.#generateAssetRow(asset, profitLossClass));
    })

    tableBody.innerHTML += this.#generateCashRow(portfolio.cashBalancePct, portfolio.cashBalance);

    document.querySelectorAll('.js-remove-icon')
      .forEach(icon => {
        icon.addEventListener('click', () => {
          const { assetId } = icon.dataset;
          portfolio.removeAsset(assetId);
          this.renderAssets(portfolio);
          summary.render(portfolio);
        });
      });
  }
  
  #generateAssetRow(asset, profitLossClass) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="ticker">${asset.ticker}</td>
      <td class="asset-name">${asset.name}</td>
      <td class="asset-type">${asset.type}</td>
      <td class="pct-of-portfolio js-pct-of-portfolio">${format.pct(asset.pctOfPortfolio)}</td>
      <td class="current-value">${format.dollars(asset.currentValue)}</td>
      <td class="total-cost">${format.dollars(asset.totalCost)}</td>
      <td class="shares">${asset.shares}</td>
      <td class="average-price">${format.dollars(asset.averagePrice, asset.lastPriceDecimals)}</td>
      <td class="last-price">${format.dollars(asset.lastPrice, asset.lastPriceDecimals)}</td>
      <td class="profit-loss ${profitLossClass}">${format.profitLoss(asset.profitLoss)}</td>
      <td class="profit-loss-pct ${profitLossClass}">${format.pct(asset.profitLossPct, true)}</td>
      <td class="remove-position">
        <img src="icons/remove-icon.png" class="remove-icon js-remove-icon" data-asset-id="${asset.id}">
      </td>
    `;

    return row;
  }

  #generateCashRow(pct, balance) {

    return `
    <tr class="cash-row">
      <td>Cash</td>
      <td></td>
      <td></td>
      <td class="pct-of-portfolio">${format.pct(pct)}</td>
      <td class="current-value">${format.dollars(balance)}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    `
  }
}

export default PortfolioTable;