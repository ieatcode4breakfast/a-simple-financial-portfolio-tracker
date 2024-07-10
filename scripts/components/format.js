const format = {
  dollars: function(num, decimals) {
    const numFormatted = num.toFixed(decimals || 2);
    return `$${numFormatted}`;
  },

  profitLoss: function(num) {
    const numAbsolute = Math.abs(num).toFixed(2);

    if (num === 0) {
      return `$${0}`;
    }

    return num > 0 ? `+$${numAbsolute}` : `-$${numAbsolute}`;
  },

  pct: function(num, pnl) {
    const number = (num * 100).toFixed(2);

    if (pnl && number > 0) {
      return `+${number}%`;
      
    } else {
      return `${number}%`;
    }
  },

  profitLossClass: function(num) {
    if (num > 0) {
      return 'js-positive-number';
  
    } else if (num < 0) {
      return 'js-negative-number';
  
    } else {
      return '';
    }
  }
}

export default format;
