// This module handles tasks related to the popup window

import {currentBalanceCents, updateCashBalance, addPosition, resetPortfolio} from "../../data/positions.js";
import {convertToDollars, convertToCents, countDecimals} from "../utils/format-numbers.js";
import {validateCashInput, checkInput} from "../utils/input-validation.js";

export function popUpDisplay() {
  const popUpDiv = document.querySelector('.js-popup');
  popUpDiv.style.visibility = 'visible';
}

// Takes the the HTML for each section and loads then to the DOM
export function popUpContent (header, body, buttons) {
  const popUpHeader = document.querySelector('.js-popup-header');
  const popUpBody = document.querySelector('.js-popup-body');
  const popupButtonsSection = document.querySelector('.js-buttons-section');
  
  popUpHeader.innerHTML = header;
  popUpBody.innerHTML = body;
  popupButtonsSection.innerHTML = buttons;
}

function closePopup() {
  const popUpDiv = document.querySelector('.js-popup');
  popUpDiv.style.visibility = 'hidden';
}


// Populates the popup DOM with edit cash form
export function editCashBalance() {
  // Set the header text
  const header = 'Edit Cash Balance';

  // Create cash input form on popup body
  const body = `
    <div>
      <label for="update-cash-input">Cash balance: </label>
      <input id="update-cash-input" class="input-field js-number-input" placeholder="$" type="number" value="${convertToDollars(currentBalanceCents)}"> 
    </div>
    <div class="error-message js-error-message">
      Please enter a valid number.
    </div>
  `;

  // Creates the buttons on the buttonss section
  const buttons = `
    <button class="submit-button js-submit-button">Submit</button>
    <button class="cancel-button js-cancel-button">Cancel</button>
  `;

  // Display the popup and load content
  popUpDisplay();
  popUpContent(header, body, buttons);

  // Assign action to submit button
  document.querySelector('.js-submit-button')
  .addEventListener('click', () => {

    // Take the input field element and value for validation
    const cashInputField = document.getElementById('update-cash-input');
    let cashInput = cashInputField.value;

    // Validate input and show red border on input field and reveal error message if invalid
    cashInput = validateCashInput(cashInput, cashInputField);

    // If invalid, nothing happens, if valid cash balance will be updated
    if (cashInput === false) {
      return;
    } else {
      updateCashBalance(cashInput);
    }

    closePopup();
  });

  // Close popup window
  document.querySelector('.js-cancel-button')
  .addEventListener('click', () => {
    closePopup();
  });
}

// Loads empty values on fields if add a postion is clicked
// If a position is being edited, it loads the existing position data on the fields
export function positionInputFields(input) {

  const {
    headerTitle,
    assetType,
    ticker,
    positionName,
    shares,
    totalCost,
    lastPrice
  } = input;

  const header = headerTitle;

  const body = `
    <div class="add-position-asset-type">
      <label for="select-asset-type">Asset Type:</label>
      <select id="select-asset-type">
        <option ${assetType === 'Stock' ? 'selected' : ''}>Stock</option>
        <option ${assetType === 'ETF' ? 'selected' : ''}>ETF</option>
        <option ${assetType === 'Crypto' ? 'selected' : ''}>Crypto</option>
      </select>
    </div>

    <div class="input-fields">
      <div>
        <label for="ticker-input">Ticker</label>
        <input id="ticker-input" placeholder="AAPL, NVDA, BTC..." type="text" class="input-field js-input-field capitalize" value="${ticker}">
      </div>
      <div>
        <label for="name-input">Name</label>
        <input id="name-input" placeholder="Apple, Bitcoin..." type="text"  class="input-field js-input-field" value="${positionName}">  
      </div>

      <div>
        <label for="shares-input">Shares</label>
        <input id="shares-input" class="input-field js-input-field js-number-input" type="number" value="${shares}">  
      </div>
      <div>
        <label for="total-cost-input">Invested</label>
        <input id="total-cost-input" class="js-input-field js-number-input input-field" placeholder="$" type="number" value="${totalCost}">
      </div>

      <div>
        <label for="last-price-input">Last price</label>
        <input id="last-price-input" class="js-input-field js-number-input input-field" placeholder="$" type="number" value="${lastPrice}">
      </div>
    </div>

    <div class="error-message js-error-message">
      Please review the fields and correct any invalid input.
    </div>
  `;

  const buttons = `
    <button class="submit-button js-submit-button">Submit</button>
    <button class="reset-button js-reset-button">Reset</button>
    <button class="cancel-button js-cancel-button">Cancel</button>
  `;

  popUpDisplay();
  popUpContent(header, body, buttons);

  // Submit button
  document.querySelector('.js-submit-button')
    .addEventListener('click', () => {

      // Check for invalid input
      // If no invalid input is detected, continue with adding/editing position
      if (!checkInput()) {

        // Pass the position ID (whether it exists or undefined)
        compileUserInput(input.id);
      } else {
        return;
      }

      resetFields();
      closePopup();
    });

  // Reset fields button
  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
      resetFields();
    });

  // Close popup window
  document.querySelector('.js-cancel-button')
    .addEventListener('click', () => {
      closePopup();
    });
}

// Confirms if you would like to reset your portfolio
export function resetPorftolioWarning() {
  const header = 'Reset portfolio?';
  const body = 'You are about to reset your portfolio. Would you like to proceed?';
  const buttons = `
    <button class="submit-button js-yes-button">Yes</button>
    <button class="cancel-button js-no-button">No</button>
  `;

  popUpDisplay();
  popUpContent(header, body, buttons);

  document.querySelector('.js-yes-button')
  .addEventListener('click', () => {
    closePopup();
    resetPortfolio();
  });

  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      closePopup();
      return;
    });
}

// Resets all fields
export function resetFields() {

  // Get all elements with class .js-input-field (basically all input fields)
  const inputFieldElements = document.querySelectorAll('.js-input-field');

  // Remove all values and red borders if there are any
  inputFieldElements.forEach(element => {
    element.value ='';
    element.classList.remove('js-invalid-input')
  });

  // Change the asset type back to default: "Stock"
  document.getElementById('select-asset-type').selectedIndex = 0;

  // Make error message disappear
  document.querySelector('.js-error-message').style.display = "none";
}

// Compiles user input data into an object
export function compileUserInput(positionId) {

  const userInput = {
    assetType: document.getElementById('select-asset-type').value,
    ticker: document.getElementById('ticker-input').value,
    positionName: document.getElementById('name-input').value,
    shares: document.getElementById('shares-input').value,

    // Convert dollars to cents
    totalCostCents: convertToCents(document.getElementById('total-cost-input').value),
    lastPriceCents: convertToCents(document.getElementById('last-price-input').value),

    // Take the number of decimals for the last price as the basis for the number of decimals on the average price and lastPrice output
    decimals: countDecimals()
  }

  // Add position to the portfolio and pass the position ID (whether it exists or undefined)
  addPosition(userInput, positionId);
}