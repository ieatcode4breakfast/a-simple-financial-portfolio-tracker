import HandleAssetInput from './data/handleAssetInput.js';
import storage from './utils/storage.js';
import { NoAsset } from './components/popups/prompts.js';
import apiKeyCheck from './utils/apiKeyCheck.js';

apiKeyCheck();

class EditAsset extends HandleAssetInput {
  #toEdit;

  constructor() {
    super();
    this.#toEdit = storage.get('toEdit') || {};
    this.tickerInput.value = this.#toEdit.ticker || '';
    this.sharesInput.value = this.#toEdit.shares || '';
    this.totalCostInput.value = this.#toEdit.totalCost || '';
    this.initialCheck();
  }

  initialCheck() {
    if (this.tickerInput.value === '') {
      new NoAsset;
    }
  }
}

new EditAsset;
