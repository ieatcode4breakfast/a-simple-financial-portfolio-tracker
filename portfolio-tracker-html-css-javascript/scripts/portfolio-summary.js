// This is the main script file that loads the dynamic HTML content on to the main page

import {positions, currentBalanceCents, updatePositions, sortData} from '../data/positions.js';
import {cashPct} from './utils/calculations.js';
import {editCashBalance, positionInputFields, resetPorftolioWarning} from './partials/popup.js';

import {
  convertToDollars,
  convertToDollarsWithDecimals,
  formatDollars,
  formatDollarsWithDecimals,
  formatPctOfPortfolio,
  formatProfitLoss,
  formatProfitLossPct,
} from './utils/format-numbers.js';

import {restoreData} from './utils/local-storage.js'

restoreData();

export function renderTableData() {

  // Declare the HTML that will be inserted to the main table body DOM
  let positionsHTML = '';

  // Create a row for every position with their respective data inserted
  // Numbers are sent to functions that format them instead of being a pure number
  positions.forEach(position => {
  
    positionsHTML +=  `
      <tr class="row position-row js-edit-position" data-position-id="${position.id}">
        <td class="ticker ">${position.ticker}</td>
        <td class="position-name ">${position.positionName}</td>
        <td class="asset-type ">${position.assetType}</td>
        <td class="pct-of-portfolio js-pct-of-portfolio ">${formatPctOfPortfolio(position.pctOfPortfolio)}</td>
        <td class="current-value ">${formatDollars(position.currentValueCents)}</td>
        <td class="total-cost ">${formatDollars(position.totalCostCents)}</td>
        <td class="shares ">${position.shares}</td>
        <td class="avg-price ">${formatDollarsWithDecimals(position.avgPriceCents, position.decimals)}</td>
        <td class="last-price ">${formatDollarsWithDecimals(position.lastPriceCents,  position.decimals)}</td>
        <td class="profit-loss js-sign-check ">${formatProfitLoss(position.profitLossCents)}</td>
        <td class="profit-loss-pct js-sign-check ">${formatProfitLossPct(position.profitLossPct)}</td>
        <td>
          <div class="remove-button-container js-remove-position-button" data-position-id="${position.id}">
            <div class="tooltip">
              Remove Position
            </div>
            <img class="remove-icon" src="icons/remove-icon.png">
          </div>
        </td>
      </tr>
    `;
  });

  // Add the "cash row" as the last row that containing the current cash balance and its % of the portfolio
  positionsHTML += `
    <tr class="row cash-row js-edit-cash";
    ">
      <td>Cash</td>
      <td></td>
      <td></td>
      <td class="pct-of-portfolio">${formatPctOfPortfolio(cashPct)}</td>
      <td class="current-value">${formatDollars(currentBalanceCents)}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `

  // Load the compiled HTML into the table body DOM
  document.querySelector('.js-positions').innerHTML = positionsHTML;

  // Clicking on any part of the row will bring up the edit position window
  const clickedPosition = (document.querySelectorAll(`.js-edit-position`));

  clickedPosition.forEach(position => {
    position.addEventListener('click', () => {

      // If the remove button/container is being clicked, stop the code
      if (event.target.closest('.remove-button-container')) {
        return;
      }
    
      // Save position ID from button's data attributes
      const {positionId} = position.dataset;

      // Find the position index based on position ID
      const index = positions.findIndex(position => position.id === positionId);

      // If the position is found, extract the needed info and put them in positionData object
      let positionData = {};
      if (index !== -1) {
        const toEdit = positions[index];
        
        positionData = {
          id: positionId,
          headerTitle: 'Edit Position',
          assetType: toEdit.assetType,
          ticker: toEdit.ticker,
          positionName: toEdit.positionName,
          shares: toEdit.shares,
          totalCost: convertToDollars(toEdit.totalCostCents),
          lastPrice: convertToDollarsWithDecimals(toEdit.lastPriceCents, toEdit.decimals)
        }
      }

      // Pass the object to the function that triggers the popup window and populates the fields with the position data being edited
      positionInputFields(positionData);
    });
  });

  // Add event listener for each remove position button
  document.querySelectorAll('.js-remove-position-button')
    .forEach(removeButton => {
      removeButton.addEventListener('click', () => {

      // Save position ID from button's data attributes
      const {positionId} = removeButton.dataset; 

      // Find the position index based on position ID
      const index = positions.findIndex(position => position.id === positionId);
      
      // If the position is found, remove it from positions array
      if (index !== -1) {
        positions.splice(index, 1);
      }

      // Reset and recalculate totals before re-rendering
      updatePositions();
    })
  });

  // Add event listener for edit cash
  document.querySelector('.js-edit-cash')
    .addEventListener('click', () => {
      editCashBalance();
    });
}

// Add event listener for reset portfolio button
document.querySelector('.js-reset-portfolio')
  .addEventListener('click', () => {
    resetPorftolioWarning();
  });
 
// Add event listener for add position button
document.querySelector('.js-add-a-position')
  .addEventListener('click', () => {
    
    // Declare empty inputs if add position button is clicked
    const positionData = {
      headerTitle: 'Add a Position',
      assetType: '',
      ticker: '',
      positionName: '',
      shares: '',
      totalCost: '',
      lastPrice: ''
    };

    positionInputFields(positionData);
  });


// Column sorting functionality
// If a new column is being sorted, it will sort numbers by descending order first, and strings by ascending order
let lastPropertySorted = 'none';
let lastColumnSorted;
let sortByAscending = false;

// Take all table headers and add an event listerner to each
document.querySelectorAll('.portfolio-table th')
  .forEach(element => {
    element.addEventListener('click', () => {

      if (positions.length === 0) {
        return;
      }

      // If the remove button header is being clicked, stop the code
      if (event.target.closest('.remove-button-header')) {
        return;
      }

      // Declare the property to sort (ticker, positionName, and so on...)
      const {sortBy} = element.dataset;

      // If last property sorted is the same is the property currently being sorted, use the last isAscending value
      if (lastPropertySorted !== sortBy) {

        // If sorting a new property, sort by descending for numbers and descending if strings
        if (typeof positions[0][sortBy] === 'number') {
          sortByAscending = false;
        } else {
          sortByAscending = true;
        }

        // If sorting a new property, Remove symbols of last column sorted
        if (lastColumnSorted) {
          lastColumnSorted.classList.remove('js-arrow-up', 'js-arrow-down');
        }
      }

      // Either arrow up or arrow down depending on ascending or descending
      element.classList.toggle('js-arrow-up', sortByAscending);
      element.classList.toggle('js-arrow-down', !sortByAscending);

      // Insert property and value of isAscending (to determine which way to sort)
      sortData(sortBy, sortByAscending);

      // Change the value of isAscending so that if it's clicked again, it will sort the other way
      lastPropertySorted = sortBy;
      lastColumnSorted = element;
      sortByAscending = !sortByAscending;
    });
  });