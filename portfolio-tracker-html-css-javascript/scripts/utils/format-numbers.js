// This module handles formatting for numbers

// Converts cents into dollars with 2 decimals and a '$' at the front 
// Example: 32491 to $324.91

export function convertToDollars(number) {
  return (number / 100).toFixed(2);
}

export function convertToDollarsWithDecimals(number, decimals) {
  return (number / 100).toFixed(decimals);
}

export function convertToCents(number) {
  return number * 100;
}

export function formatDollars(number) {
  return `$${(number / 100).toFixed(2)}`;
}

export function formatDollarsWithDecimals(number, decimals) {
  return `$${(number / 100).toFixed(decimals)}`;
}

// Formats percentages (example: 28.25%)
export function formatPctOfPortfolio(number) {
  return `${(number * 100).toFixed(2)}%`;
}

// Converts cents into dollars and adds the positive or negative sign before the dollar value
export function formatProfitLoss(number) {
  let result = (number / 100).toFixed(2);

  if (result > 0) {
    result = `+$${result}`; // If positive, example formatted value: +$142.23
  } else if (result < 0) {
    result = `-$${Math.abs(result)}`; // If negative, converts value to absolute and adds negative sign, example formatted value: -$142.23
  } else {
    result = `$${result}` // If zero, $0.00;
  }

  return result;
}

// Adds a positive or negative sign to profit/loss percentages
export function formatProfitLossPct(number) {
  let result = (number * 100).toFixed(2);

  if (result > 0) {
    result = `+${result}%`; // If positive, adds a positive sign at the beginning
  } else {
    result = `${result}%`; // Simply adds a percentage symbol, negative number already contain negative sign
  }

  return result;
}

// Gathers all elements that contain the class js-sign-check (numbers that indicate profit or loss) and changes the font color based on negative and positive
// Zeroes won't change color
export function profitLossStyling() {
  let profitLossElements = document.querySelectorAll('.js-sign-check');

  profitLossElements.forEach(element => {

    // Remove previous styling
    element.classList.remove('js-positive-number');
    element.classList.remove('js-negative-number');

    // If positive, change color to green
    if (element.innerHTML.includes('+')) {
      element.classList.add('js-positive-number') 

    // If negative, change color to red
    } else if (element.innerHTML.includes('-')) {
      element.classList.add('js-negative-number') 
    }
  });
}

// Counts and returns the number of decimals
export function countDecimals() {

  // Get the last price input
  const lastPriceInput = document.getElementById('last-price-input').value;

  let decimals;

  // toString() avoids undefined value if user did not input a number after '.'
  if (lastPriceInput.toString().includes('.')) {
    decimals = lastPriceInput.toString().split('.')[1].length
  } else {

    // Set the default number of decimals to 2 if no decimal is entered
    decimals = 2;
  }

  return decimals;
}