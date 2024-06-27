const format = {
  pct: function(num, pnl) {
    const number = (num * 100).toFixed(2);

    if (pnl && number > 0) {
      return `+${number}%`;
      
    } else {
      return `${number}%`;
    }
  },

  dollars: function(num, decimals, pnl) {
    const number = num.toFixed(decimals || 2);

    if (!pnl) {
      return `$${number}`;
    }

    if (number > 0) {
      return `+$${number}`;

    } else if (number < 0) {
      return `${number.replace('-', '-$')}`;
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