import Popup from './popupTemplate.js';

export class ResetPorftolio extends Popup {
  #portfolio

  constructor(portfolio) {
    super(
      'Reset Portfolio',
      'This action is irreversible and all your current data will be lost. Are you sure you would like to proceed?',
      'Confirm'
    );

    this.#portfolio = portfolio;
  }

  action() {
    this.#portfolio.reset();
  }
}

export class NoAsset extends Popup {
  constructor() {
    super(
      'No asset detected',
      `There isn't an asset currently being edited.`,
      'Close'
    )
  }

  display() {
    document.querySelector('.js-popup-section').style.display = "flex";

    this.popupBody = document.querySelector('.js-popup-body');
    this.popupBody.innerHTML = `
      <div class="popup-content js-popup-content">
      </div>
      <div class="buttons-section">
        <button class="js-action-button"></button>
      </div>
    `

    document.querySelector('.js-action-button')
      .addEventListener('click', () => {
        this.action();
      });
  }

  action() {
    window.location.href = '/';
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