import storage from '../utils/storage.js';

const API_KEY = 'fd1342d6d7msh3c84b13bab900bcp13a917jsnd53a2437b57f';

const marketData = {
  stored: storage.get('marketData') || [],

  getSingleQuote: async function(ticker) {
    try {
      const url = `https://yahoo-finance127.p.rapidapi.com/price/${ticker}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      const result = await response.json();     
      const name = result.shortName || result.longName;
      const type = result.typeDisp;
      const lastPrice = result.regularMarketPrice.raw;

      // Filter out current ticker from stored ata if already existing
      const filteredData = this.removeExisting(ticker, this.stored); 

      filteredData.push({ ticker, name, type, lastPrice});
      this.stored = filteredData;
      storage.set('marketData', this.stored);
      console.log(result);
    } catch (error) {
      console.error(`An error occured while retrieving market data for ticker symbol ${ticker}`, error);
    }
  },

  removeExisting: function(ticker, data) {
    // If ticker data has been stored previously, filter it out
    return data.filter(asset => asset.ticker !== ticker);
  },

  search: function(ticker) {
    return this.stored.find(asset => asset.ticker === ticker);
  }
};

export default marketData;