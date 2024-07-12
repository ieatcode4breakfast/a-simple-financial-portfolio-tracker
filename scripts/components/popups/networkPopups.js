import Popup from './popupTemplate.js';
import storage from '../../utils/storage.js';
import { SingleActionPopup } from './singleActionPopup.js';

export class InvalidApiKey extends SingleActionPopup {
  constructor() {
    super(
      'Invalid API Key',
      `It looks like the API key you are using is invalid. Please ensure that you have obtained a valid API key and try again.`,
      'Close'
    )

    storage.set('apiKey', '');
  }

  action() {
    window.location.reload();
  }
}

export class RequestLimitReached extends SingleActionPopup {
  constructor() {
    super(
      'API limit reached',
      'It looks like you have reached your API request limit. Please try again later when your limit has refreshed or use another API key. You may also consider upgrading your plan for a higher request limit.',
      'Close'
    )
  }

  action() {
    window.location.href = './';
  }
}

export class InvalidTicker extends SingleActionPopup {
  constructor() {
    super(
      'Invalid ticker',
      'The ticker symbol you have entered is either invalid or not supported. Please ensure that the ticker symbol you are trying to enter is correct and formatted correctly.',
      'Close'
    )
  }

  action() {
    this.close();
  }
}

export class GeneralError extends SingleActionPopup {
  constructor() {
    super(
      'Unexpected error',
      'An error occured while retrieving market data. Make sure that you are connected to the internet and try again.',
      'Close'
    )
  }

  action() {
    window.location.reload();
  }
}
