import Popup from './popupTemplate.js';
import { portfolio , portfolioTable, summary } from '../../index.js';

class EditCash extends Popup {
  cashInput;
  submitButton;

  constructor() {
    super(
      'Edit Cash Balance',
      `
        Enter cash balance:
        <input class="cash-input js-cash-input" type="text" placeholder="$">
      `,
      'Submit'
    );

    this.cashInput = document.querySelector('.js-cash-input')
    this.cashInput.focus();
  }

  action() {
    portfolio.cashBalance = Number(this.cashInput.value);
    portfolio.update();
    portfolioTable.renderAssets(portfolio);
    summary.render(portfolio);
  }
}

export default EditCash;