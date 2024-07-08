import Popup from './popupTemplate.js';
import { portfolio , portfolioTable, summary } from '../../index.js';
import valid from '../../utils/validate.js';

class EditCash extends Popup {
  cashInput;
  submitButton;

  constructor() {
    super(
      'Edit Cash Balance',
      `
        Enter cash balance:
        <input class="cash-input js-cash-input" type="text" placeholder="$">
        <span class="error-message js-error-message">Invalid input.</span>
      `,
      'Submit'
    );

    this.cashInput = document.querySelector('.js-cash-input')
    this.cashInput.focus();
  }

  action() {
    if (!valid.cashInput(this.cashInput.value)) {
      document.querySelector('.js-error-message').style.display = 'initial';
      this.cashInput.focus();
      return;
    }

    portfolio.cashBalance = Number(this.cashInput.value);
    portfolio.update();
    portfolioTable.renderAssets(portfolio);
    summary.render(portfolio);
    this.close();
  }
}

export default EditCash;