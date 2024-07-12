import storage from '../../utils/storage.js';
import Popup from './popupTemplate.js';

export class ApiKeyPrompt extends Popup {
  apiInput;

  constructor() {
    super(
      'Enter API Key',
      `
        Please enter your API key:
        <input class="js-api-input" type="text">

        <p class="api-key-instruction">
          This app uses Stock Pulse API from RapidAPI.com. To use or test this app, visit the Stock Pulse API page where you can sign up and get your own free API key for testing:
        </p>
        <a href="https://rapidapi.com/manwilbahaa/api/yahoo-finance127" target="_blank">
          https://rapidapi.com/manwilbahaa/api/yahoo-finance127
        </a>
      `,
      'Submit'
    );

    this.apiInput = document.querySelector('.js-api-input');
  }

  action() {
    storage.set('apiKey', this.apiInput.value);
    this.close();
    window.location.reload();
  }
}
