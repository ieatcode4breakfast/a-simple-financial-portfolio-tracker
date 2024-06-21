// This module handled input validation tasks

import {convertToCents} from './format-numbers.js';

// Validates cash input
export function validateCashInput(number, element) {
  number = parseFloat(number);

  // If not a number and less than 0, invalid
  if (isNaN(number) || number < 0) {

    // Change border to red and show error when invalid
    element.classList.add('js-invalid-input');
    showErrorMessage(true);

    return false;
  } else {
    
    // If valid, remove red border and error message
    element.classList.remove('js-invalid-input');
    showErrorMessage(false);
    
    // Return the number in cents
    return convertToCents(number);
  }
}

export function showErrorMessage(showError) {
  const errorMessage = document.querySelector('.js-error-message');
  
  if (showError) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }
}

export function checkInput() {

  // Get all input elements
  const numberInputElements = document.querySelectorAll('.js-number-input');

  // Get error message element
  const errorMessage = document.querySelector('.js-error-message');

  let invalidInput = false;

  numberInputElements.forEach(element => {
    const parsedElement = parseFloat(element.value);
    
    // Check if invalid input is not a number, equal to or less than 0
    if (isNaN(parsedElement) || parsedElement <= 0) {
      element.classList.add('js-invalid-input');
      invalidInput = true;
    } else {
      element.classList.remove('js-invalid-input');
    }
  });

  // If there is an invalid input, show error and if none, hide error
  if (invalidInput) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }

  return invalidInput;
}