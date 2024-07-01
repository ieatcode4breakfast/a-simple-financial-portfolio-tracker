import storage from '../utils/storage.js';

const marketData = {
  stored: storage.get('marketData') || [],

  get: async function(ticker) {
    try {
      const url = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${ticker}%3ANASDAQ&language=en`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '9672bea8b6msh08311a0bf49ad01p1b108ajsn852635995062',
          'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
        }
      };
  
      const response = await fetch(url, options);
      const result = await response.json();
      const name = result.data.name;
      const lastPrice =  result.data.price;

      this.data.push({ ticker, name, lastPrice});
      storage.set('marketData', this.stored);
      console.log(storage.get('marketData'));
    } catch (error) {
      console.error(`An error occured while retrieving market data for ticker symbol ${ticker}`, error);
    }
  },

  searchStored: function() {

  }
};

export default marketData;