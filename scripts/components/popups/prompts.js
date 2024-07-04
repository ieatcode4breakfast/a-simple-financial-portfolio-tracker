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