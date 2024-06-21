// This module handles localStorage tasks

import {positions, currentBalanceCents, restorePreviousData} from '../../data/positions.js';

// Stores positions and cash balance into an object and saves it to localStorage
export function storeData() {
  let portfolioData = {
    positions,
    currentBalanceCents,
  }

  localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
}

// Extracts previous data. If null, set cash balance to 0 and an empty array [];
export function restoreData() {
  const previousData = JSON.parse(localStorage.getItem('portfolio-data'));
  let previousBalance;
  let previousPositions;

  if (previousData) {
    previousBalance = previousData.currentBalanceCents;
    previousPositions = previousData.positions;
  } else {
    previousBalance = 0;
    previousPositions = [];
  }

  restorePreviousData(previousBalance, previousPositions);
}