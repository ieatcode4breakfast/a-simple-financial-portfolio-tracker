import valid from '../utils/validate.js';
import marketData from './marketData.js';
import Asset from './asset.js';
import Portfolio from './portfolio.js';
import apiKeyCheck from '../utils/apiKeyCheck.js';
import { GeneralError, InvalidApiKey, InvalidTicker, RequestLimitReached } from '../components/popups/networkPopups.js';
import { AddAssetSuccess, EditAssetSuccess } from '../components/popups/completionPopups.js';

const portfolio = new Portfolio;

class HandleAssetInput {
  tickerInput;
  sharesInput;
  totalCostInput;
  ticker;
  #shares;
  #totalCost;
  #allInputsValid;

  constructor() {
    this.tickerInput = document.querySelector('.js-ticker');;
    this.sharesInput = document.querySelector('.js-shares');;
    this.totalCostInput = document.querySelector('.js-total-cost');;
    this.#allInputsValid = true;
    this.addListeners();
  }

  addListeners() {
    document.querySelector('.js-cancel-button').addEventListener('click', () => {
      window.location.href = './';
    });

    document.querySelector('.js-add-asset-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      this.submitAsset();
    });
  }

  async submitAsset(operation) {
    if (!apiKeyCheck()) return;
    this.ticker = this.tickerInput.value.toUpperCase();
    this.#shares = Number(this.sharesInput.value);
    this.#totalCost = Number(this.totalCostInput.value);
    this.#validateInputs();

    if (!this.#allInputsValid) {
      return
    }

    // Check if there is already an existing market data stored for this ticker
    const existingData = marketData.search(this.ticker);
    let responseStatus = 200;

    // If there is no market data stored yet, fetch it from live market data
    if (!existingData) {
      responseStatus = await marketData.getSingleQuote(this.ticker);
    }

    if (responseStatus === 200) {
      const asset = new Asset({ 
        ticker: this.ticker, 
        shares: this.#shares, 
        totalCost: this.#totalCost
      });
  
      portfolio.replaceAsset(asset);

      operation === 'addAsset' 
        ? new AddAssetSuccess(this.ticker)
        : new EditAssetSuccess(this.ticker);

    } else {
      switch (responseStatus) {
        case 403:
          new InvalidApiKey;
          break;
        case 429:
          new RequestLimitReached;
          break;
        case 500:
          new InvalidTicker;
          break;
        default:
          new GeneralError;
      }
    }
  }

  #validateInputs() {
    this.#allInputsValid = true;

    if (this.ticker === '') {
      this.tickerInput.classList.add('js-input-error');
      this.#allInputsValid = false;
    } else {
      this.tickerInput.classList.remove('js-input-error');
    }

    if (!valid.numberInput(this.#shares)) {
      this.sharesInput.classList.add('js-input-error');
      this.#allInputsValid = false;
    } else {
      this.sharesInput.classList.remove('js-input-error');
    }

    if (!valid.numberInput(this.#totalCost)) {
      this.totalCostInput.classList.add('js-input-error');
      this.#allInputsValid = false;
    } else {
      this.totalCostInput.classList.remove('js-input-error');
    }

    if (!this.#allInputsValid) {
      document.querySelector('.js-error-message').style.display = "initial";
    } else {
      document.querySelector('.js-error-message').style.display = "none";
    }
  }

}

export default HandleAssetInput;
