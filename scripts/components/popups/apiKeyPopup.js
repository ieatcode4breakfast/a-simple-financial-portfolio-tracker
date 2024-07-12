import storage from '../../utils/storage.js';
import { apiKeyUpdateSuccess } from './completionPopups.js';
import Popup from './popupTemplate.js';

export class ApiKeyPrompt extends Popup {
  apiInput;

  constructor() {
    super(
      'Enter API Key',
      `
        Please enter your API key:
        <input class="js-api-input" type="text">
        <span class="error-message js-error-message">Invalid input.</span>
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
    this.apiInput.focus();
  }

  action() {
    if (this.apiInput.value === '') {
      document.querySelector('.js-error-message').style.display = 'initial';
      this.apiInput.focus();
      return;
    }

    storage.set('apiKey', this.apiInput.value);
    new apiKeyUpdateSuccess;
  }
}
