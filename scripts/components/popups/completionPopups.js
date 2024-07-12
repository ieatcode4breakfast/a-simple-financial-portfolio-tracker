import Popup from './popupTemplate.js';
import { SingleActionPopup } from './singleActionPopup.js';

export class addAssetSuccess extends SingleActionPopup {
  constructor(ticker) {
    super(
      'Success!',
      `${ticker} has been added your portfolio.`,
      'OK'
    )
  }

  action() {
    window.location.href = './';
  }
}

export class editAssetSuccess extends SingleActionPopup {
  constructor(ticker) {
    super(
      'Success!',
      `${ticker} has been updated.`,
      'OK'
    )
  }

  action() {
    window.location.href = './';
  }
}

export class editCashSuccess extends SingleActionPopup {
  constructor() {
    super(
      'Success!',
      `Your cash balance has been updated.`,
      'OK'
    )
  }

  action() {
    this.close();
  }
}

export class updateMarketDataSuccess extends SingleActionPopup {
  constructor() {
    super(
      'Success!',
      `Market data has been updated with the latest available prices.`,
      'OK'
    )
  }

  action() {
    window.location.reload();
  }
}

export class apiKeyUpdateSuccess extends SingleActionPopup {
  constructor() {
    super(
      'Success!',
      `Your API key has been udpated.`,
      'OK'
    )
  }

  action() {
    this.close();
  }
}

export class PortfolioResetSuccess extends SingleActionPopup {
  constructor() {
    super(
      'Success!',
      `Your portfolio has been reset.`,
      'OK'
    )
  }

  action() {
    window.location.reload();
  }
}
