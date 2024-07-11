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
