import storage from '../utils/storage.js';

const API_KEY = 'dba43241c4msh36d58bdf3f8635bp1cc051jsnf030d478617d';

const marketData = {
  stored: storage.get('marketData') || [],

  get: async function(ticker) {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();     
      const name = result.longName || result.longName;
      const lastPrice = result.regularMarketPrice.raw;

      // Filter out current ticker from stored ata if already existing
      const filteredData = this.removeExisting(ticker, this.stored); 

      filteredData.push({ ticker, name, lastPrice});
      this.stored = filteredData;
      storage.set('marketData', this.stored);
      console.log(storage.get('marketData'));
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