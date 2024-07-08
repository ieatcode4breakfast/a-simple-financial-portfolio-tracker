import AddAsset from './data/newAsset.js';
import storage from './utils/storage.js';

class EditAsset extends AddAsset {
  #toEdit;

  constructor() {
    super();
    this.#toEdit = storage.get('toEdit') || '';
    this.tickerInput.value = this.#toEdit.ticker;
    this.sharesInput.value = this.#toEdit.shares;
    this.totalCostInput.value = this.#toEdit.totalCost;
  }
}

new EditAsset;