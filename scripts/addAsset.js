import { OverrideExisting } from './components/popups/prompts.js';
import HandleAssetInput from './data/handleAssetInput.js';
import Portfolio from './data/portfolio.js';
import apiKeyCheck from './utils/apiKeyCheck.js';

apiKeyCheck();

class AddAsset extends HandleAssetInput {
  #portfolio;

  constructor(portfolio) {
    super();
    this.#portfolio = portfolio;
  }

  addListeners() {
    document.querySelector('.js-cancel-button').addEventListener('click', () => {
      window.location.href = './';
    });

    document.querySelector('.js-add-asset-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      if (this.#portfolio.search(this.tickerInput.value)) {
        new OverrideExisting(this);
        return;
      }

      this.submitAsset('addAsset'); // This argument triggers the "successfully added" popup
    });
  }
}

const portfolio = new Portfolio();
new AddAsset(portfolio);
