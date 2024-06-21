// This module handles most calculation tasks

import {currentBalanceCents,positions} from '../../data/positions.js';

// Declare variables for total values
export let totalPositionsValueCents = 0;
export let totalInvestedCents = 0;
export let totalProfitLossCents = 0;
export let totalProfitLossPct = 0;
export let totalValueCents = 0;
export let cashPct = 0;

// Takes the object with user input values and calculates additional properties
export function calculateData(position) {

  // Convert shares to a number
  position.shares = Number(position.shares);

  // Calculate current value
  position.currentValueCents = position.shares * position.lastPriceCents;

  // Calculate average price
  position.avgPriceCents = position.totalCostCents / position.shares;

  // Calculate profit/loss
  position.profitLossCents = position.currentValueCents - position.totalCostCents;

  // Calculates profit/loss%
  position.profitLossPct = position.profitLossCents / position.totalCostCents;
  return position;
}

export function calculateTotals(position) {

  // Add current value of the position to total value of positions
  totalPositionsValueCents += position.currentValueCents;

  // Sum current value of positions and cash balance for the total portoflio value
  totalValueCents = totalPositionsValueCents + currentBalanceCents;

  // Sum total cost of the positions
  totalInvestedCents += position.totalCostCents;

  // Sum total profits/losses
  totalProfitLossCents += position.profitLossCents;

  // Divide total profits/losses by total value of portfolio
  totalProfitLossPct = totalProfitLossCents / (totalInvestedCents + currentBalanceCents);
}

// Calculates the percentage of portfolio for each position
// Needs its own function because the percentage of portfolio can only be determined after all the positions + cash balance have been added (not while processing each position)
export function calculatePctOfPortfolio(position) {
  position.pctOfPortfolio = position.currentValueCents / totalValueCents;
  return position;
}


export function calculateCashPct(balance, total) {
  
  // If current balance is 0, cashPCT is obviously 0
  if (currentBalanceCents === 0) {
    cashPct = 0;    
  
  // If there are no positions and cash is greater than 0, it's 100% of the portfolio
  } else if (positions.length === 0 && currentBalanceCents > 0) {
    cashPct = 1;

  // If there are existing positions, it will calculate the cash % as normal
  } else {
    cashPct = balance / total;
  }
}

export function resetTotals() {
  totalPositionsValueCents = 0;
  totalInvestedCents = 0;
  totalProfitLossCents = 0;
  totalProfitLossPct = 0;
  totalValueCents = 0;
}
