import valid from './utils/validate.js';
import marketData from './data/marketData.js';
import Asset from './data/asset.js';
import Portfolio from './data/portfolio.js';

const portfolio = new Portfolio;

document.querySelector('.js-cancel-button').addEventListener('click', () => {
  window.location.href = './index.html';
});

document.querySelector('.js-add-asset-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const tickerInput = document.querySelector('.js-ticker');
  const sharesInput = document.querySelector('.js-shares');
  const totalCostInput = document.querySelector('.js-total-cost');

  const ticker = tickerInput.value.toUpperCase();
  const shares = Number(sharesInput.value);
  const totalCost = Number(totalCostInput.value);

  let allInputsValid = true;

  if (ticker === '') {
    tickerInput.classList.add('js-input-error');
    allInputsValid = false;
  } else {
    tickerInput.classList.remove('js-input-error');
  }

  if (!valid.numberInput(shares)) {
    sharesInput.classList.add('js-input-error');
    allInputsValid = false;
  } else {
    sharesInput.classList.remove('js-input-error');
  }

  if (!valid.numberInput(totalCost)) {
    totalCostInput.classList.add('js-input-error');
    allInputsValid = false;
  } else {
    totalCostInput.classList.remove('js-input-error');
  }

  if (!allInputsValid) {
    document.querySelector('.js-error-message').style.display = "initial";
    return;
  } else {
    document.querySelector('.js-error-message').style.display = "none";
  }

  const existingData = marketData.search(ticker);

  if (!existingData) {
    console.log(`No existing data available for ticker symbol ${ticker}, fetching live market data...`);
    await marketData.get(ticker);
  }

  const asset = new Asset({ ticker, shares, totalCost });
  asset.processAssetData();
  portfolio.addAsset(asset);
  window.location.href = './index.html';
});