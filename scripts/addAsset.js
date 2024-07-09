import { OverrideExisting } from './components/popups/prompts.js';
import NewAsset from './data/newAsset.js';
import Portfolio from './data/portfolio.js';

class AddAsset extends NewAsset {
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

      this.submitAsset();
    });
  }
}

const portfolio = new Portfolio();
new AddAsset(portfolio);