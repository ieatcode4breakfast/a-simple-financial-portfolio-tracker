// This module updates the summary section of the Portfolio Summary page

// Import total values from calculations.js
import {totalInvestedCents,
  totalProfitLossCents,
  totalValueCents,
  totalProfitLossPct} from '../utils/calculations.js';

// Import cash balance from positions.js
import {currentBalanceCents} from '../../data/positions.js';

// Import number formatting styles
import {formatDollars, formatProfitLoss, formatProfitLossPct} from '../utils/format-numbers.js';

// Gathers the summary elements, styles the imported values and dynamically adds the values to the DOM
export function updateSummary() {
  document.querySelector('.js-total-invested')
    .innerHTML = formatDollars(totalInvestedCents);
  document.querySelector('.js-total-profit-loss')
    .innerHTML = formatProfitLoss(totalProfitLossCents);
  document.querySelector('.js-total-profit-loss-pct')
    .innerHTML = formatProfitLossPct(totalProfitLossPct);
  document.querySelector('.js-cash-balance')
    .innerHTML = formatDollars(currentBalanceCents);
  document.querySelector('.js-portfolio-value')
    .innerHTML = formatDollars(totalValueCents);
}