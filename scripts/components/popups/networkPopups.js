import Popup from './popupTemplate.js';
import storage from '../../utils/storage.js';

export class InvalidApiKey extends Popup {
  constructor() {
    super(
      'Invalid API Key',
      `It looks like the API key you are using is invalid. Please ensure that you have obtained a valid API key and try again.`,
      'Close'
    )

    storage.set('apiKey', '');
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
        this.close();
        window.location.reload();
      });
  }
}

export class RequestLimitReached extends Popup {
  constructor() {
    super(
      'API limit reached',
      'It looks like you have reached your API request limit. Please try again later when your limit has refreshed or use another API key. You may also consider upgrading your plan for a higher request limit.',
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
        this.close();
        window.location.href = './';
      });
  }
}

export class InvalidTicker extends Popup {
  constructor() {
    super(
      'Invalid ticker',
      'The ticker symbol you have entered is either invalid or not supported. Please ensure that the ticker symbol you are trying to enter is correct and formatted correctly.',
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
        this.close();
        window.location.reload();
      });
  }
}

export class GeneralError extends Popup {
  constructor() {
    super(
      'Unexpected error',
      'An error occured while retrieving market data. Make sure that you are connected to the internet and try again.',
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
        this.close();
        window.location.reload();
      });
  }
}