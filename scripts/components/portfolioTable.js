import format from './format.js';

class PortfolioTable {
  renderAssets(portfolio) {
    const tableBody = document.querySelector('.js-table-body');

    portfolio.assets.forEach(asset => {
      const profitLossClass = format.profitLossClass(asset.profitLoss);
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
        <td class="pct-of-portfolio js-pct-of-portfolio">${format.pct(asset.pctOfPortfolio)}</td>
        <td class="current-value">${format.dollars(asset.currentValue)}</td>
        <td class="total-cost">${format.dollars(asset.totalCost)}</td>
        <td class="shares">${asset.shares}</td>
        <td class="average-price">${format.dollars(asset.averagePrice, asset.lastPriceDecimals)}</td>
        <td class="last-price">${format.dollars(asset.lastPrice, asset.lastPriceDecimals)}</td>
        <td class="profit-loss ${profitLossClass}">${format.profitLoss(asset.profitLoss)}</td>
        <td class="profit-loss-pct ${profitLossClass}">${format.pct(asset.profitLossPct, true)}</td>
      </tr>
    `;
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
    </tr>
    `
  }
}

export default PortfolioTable;