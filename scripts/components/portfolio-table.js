class PortfolioTable {
  renderAssets(portfolio) {
    const tableBody = document.querySelector('.js-table-body');
    portfolio.assets.forEach(asset => {
      tableBody.innerHTML += this.#generateAssetRow(asset);
    })
  }
  
  #generateAssetRow(asset) {
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
        <td class="profit-loss js-sign-check">${asset.profitLoss}</td>
        <td class="profit-loss-pct js-sign-check">${asset.profitLossPct}</td>
      </tr>
    `;
  }

  #generateCashRow() {
    
  }
}

export default PortfolioTable;