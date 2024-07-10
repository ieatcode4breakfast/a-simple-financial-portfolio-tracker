const valid = {
  cashInput: function(input) {
    return !isNaN(input) && input >= 0 && input !== '';
  },

  numberInput: function(input) {
    return !isNaN(input) && input > 0 && input !== '';
  }
}

export default valid;
