import storage from '../../utils/storage.js';
import { PortfolioResetSuccess } from './completionPopups.js';
import Popup from './popupTemplate.js';
import { SingleActionPopup } from './singleActionPopup.js';

export class ResetPortfolio extends Popup {
  constructor() {
    super(
      'Reset Portfolio',
      'This action is irreversible and all your current data will be lost. Are you sure you would like to proceed?',
      'Confirm'
    );
  }

  action() {
    storage.clear();
    new PortfolioResetSuccess;
  }
}

export class OverrideExisting extends Popup {
  #addAssetClass;

  constructor(addAssetClass) {
    super(
      'Override existing asset',
      'This asset already exists in your portfolio. Would you like to override it?',
      'Yes'
    );

    this.#addAssetClass = addAssetClass;
  }

  action() {
    this.#addAssetClass.submitAsset();
  }
}


export class NoAsset extends SingleActionPopup {
  constructor() {
    super(
      'No asset being edited',
      `There isn't an asset currently being edited.`,
      'Close'
    )
  }

  action() {
    window.location.href = './';
  }
}


