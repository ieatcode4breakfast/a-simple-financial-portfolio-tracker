// This module handles most tasks related to the positions data, 

import {renderTableData} from '../scripts/portfolio-summary.js';
import {calculateData, calculateTotals, resetTotals, calculatePctOfPortfolio, calculateCashPct, totalValueCents} from '../scripts/utils/calculations.js';
import {storeData} from '../scripts/utils/local-storage.js';
import {updateSummary} from '../scripts/partials/summary-section.js';
import {profitLossStyling} from '../scripts/utils/format-numbers.js';

// Load cash balance and positions array from localStorage
// If none is found, set default for positions to [] and cash balance to 0
export let currentBalanceCents = 0;
export let positions = [];

// Takes the initial data from user input (asset type, ticker, position name, shares, total cost, and last price) and positionId if editing an existing position
export function addPosition(position, positionId) {
  
  // Calculate additional properties such as current value, average price, profit/loss and profit/loss%
  calculateData(position);

  // Check if positionId is undefined, if undefined, add new position
  if (typeof positionId === 'undefined') {
    positions.push(position);

  // If positionId exists, edit position
  } else {

    // Find index of position being edited based on positionId
    const index = positions.findIndex(pos => pos.id === positionId);

    // Once found, replace existing position with edited data
    if (index !== -1) {
      positions[index] = position;
    }
  }

  // Recalculate and render all data
  updatePositions();
}

export function updateCashBalance(number) {
  currentBalanceCents = number;

  updatePositions();
}

// Resets the totals, re-assigns unique IDs to positions, recalculates them, re-renders the table and stores all data
export function updatePositions() {
  
  // Reset outdated totals
  resetTotals();

  // Assign a unique position ID
  positions.forEach((position, index) => {
    position.id = `position-${index + 1}`
    calculateTotals(position);
  });

  // Calculate % of portfolio after all positions have been calculated so that the totalValue is properly updated
  positions.forEach(position => {
    calculatePctOfPortfolio(position);
  });

  // Calculate % of portofio in cash prior to adding the cash row
  calculateCashPct(currentBalanceCents, totalValueCents);

  // Calculate all the % allocation of each position
  renderTableData();

  // Update the summary section
  updateSummary();

  // Format all profit and loss information with green for positive and red for negative numbers
  profitLossStyling();
  storeData();
}

export function restorePreviousData(previousBalance, previousPositions) {
  currentBalanceCents = previousBalance;
  positions = previousPositions;

  updatePositions();
}

// Resets the position array, cashbalance, and clears localStorage
export function resetPortfolio() {
  positions.length = 0;
  currentBalanceCents = 0;
  localStorage.removeItem('portfolio-data');
  window.location.reload();
}

// Sorts the positions by column
export function sortData(sortBy, sortByAscending) {
  
  positions.sort((a, b) => {

    // Assign variables to positions being sorted by specific property
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // If is ascending is true, set to 1, if false, set to -1
    const sortOrder = sortByAscending ? 1 : -1;

    let compare;

    // Determine if the property being sorted is a number or string
    if (typeof valueA === 'number') {
      compare = valueA - valueB;
    } else {
      compare = valueA.localeCompare(valueB);
    }

    // If the result of compare is negative, compare multiplied by 1 will be negative which will sort the positions in descending order and vice versa
    return (compare * sortOrder);
  });

  updatePositions();
}