import { profitLossStyle } from './format.js';

class PortfolioTable {
  renderAssets(portfolio) {
    const tableBody = document.querySelector('.js-table-body');

    portfolio.assets.forEach(asset => {
      const profitLossClass = profitLossStyle(asset.profitLoss);
      tableBody.innerHTML += this.#generateAssetRow(asset, profitLossClass);
    })

    tableBody.innerHTML += this.#generateCashRow(portfolio.cashBalancePct, portfolio.cashBalance);
  }
  
  #generateAssetRow(asset, profitLossClass) {
    return `
      <tr data-asset-id="${asset.id}">
        <td class="ticker">${asset.ticker}</td>
        <td class="asset-name">${asset.name}</td>
        <td class="asset-type">${asset.type}</td>
        <td class="pct-of-portfolio js-pct-of-portfolio">${asset.pctOfPortfolio}</td>
        <td class="current-value">${asset.currentValue}</td>
        <td class="total-cost">${asset.totalCost}</td>
        <td class="shares">${asset.shares}</td>
        <td class="average-price">${asset.averagePrice}</td>
        <td class="last-price">${asset.lastPrice}</td>
        <td class="profit-loss ${profitLossClass}">${asset.profitLoss}</td>
        <td class="profit-loss-pct ${profitLossClass}">${asset.profitLossPct}</td>
      </tr>
    `;
  }

  #generateCashRow(pct, balance) {
    return `
    <tr>
      <td>Cash</td>
      <td></td>
      <td></td>
      <td class="pct-of-portfolio">${pct}</td>
      <td class="current-value">${balance}</td>
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