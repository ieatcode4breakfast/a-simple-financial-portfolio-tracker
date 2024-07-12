import Popup from './popupTemplate.js';

export class addAssetSuccess extends Popup {
  constructor(ticker) {
    super(
      'Success!',
      `${ticker} has been added your portfolio.`,
      'OK'
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
    window.location.href = './';
  }
}

export class editAssetSuccess extends Popup {
  constructor(ticker) {
    super(
      'Success!',
      `${ticker} has been updated.`,
      'OK'
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
    window.location.href = './';
  }
}

export class editCashSuccess extends Popup {
  constructor() {
    super(
      'Success!',
      `Your cash balance has been updated.`,
      'OK'
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
    this.close();
  }
}

export class updateMarketDataSuccess extends Popup {
  constructor() {
    super(
      'Success!',
      `Market data has been updated with the latest available prices.`,
      'OK'
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
    window.location.reload();
  }
}

export class apiKeyUpdateSuccess extends Popup {
  constructor() {
    super(
      'Success!',
      `Your API key has been udpated.`,
      'OK'
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
    this.close();
  }
}

export class PortfolioResetSuccess extends Popup {
  constructor() {
    super(
      'Success!',
      `Your portfolio has been reset.`,
      'OK'
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
    window.location.reload();
  }
}
