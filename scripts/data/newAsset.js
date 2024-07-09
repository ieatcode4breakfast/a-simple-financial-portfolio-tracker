import valid from '../utils/validate.js';
import marketData from './marketData.js';
import Asset from './asset.js';
import Portfolio from './portfolio.js';

const portfolio = new Portfolio;

class NewAsset {
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

  #overrideExisting() {
    // Get the asset details if it already exists in the portfolio
    const existingAsset = portfolio.search(this.ticker);

    // If it exists, remove it
    if (existingAsset) {
      portfolio.removeAsset(existingAsset.id);
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

  async submitAsset() {
    this.ticker = this.tickerInput.value.toUpperCase();
    this.#shares = Number(this.sharesInput.value);
    this.#totalCost = Number(this.totalCostInput.value);

    this.#validateInputs();

    if (!this.#allInputsValid) {
      return
    }

    // Check if there is already an existing market data stored for this ticker
    const existingData = marketData.search(this.ticker);

    // If there is no market data stored yet, fetch it from live market data
    if (!existingData) {
      console.log(`No existing data available for ticker symbol ${this.ticker}, fetching live market data...`);
      await marketData.getSingleQuote(this.ticker);
    }

    const asset = new Asset({ 
      ticker: this.ticker, 
      shares: this.#shares, 
      totalCost: this.#totalCost
    });

    asset.processAssetData();
    this.#overrideExisting();
    portfolio.addAsset(asset);
    window.location.href = '/';
  }
}

export default NewAsset;