import { SingleActionPopup } from './singleActionPopup.js';

export class AddAssetSuccess extends SingleActionPopup {
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

export class EditAssetSuccess extends SingleActionPopup {
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

export class EditCashSuccess extends SingleActionPopup {
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

export class UpdateMarketDataSuccess extends SingleActionPopup {
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

export class ApiKeyUpdateSuccess extends SingleActionPopup {
  constructor() {
    super(
      'Success!',
      `Your API key has been updated.`,
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
