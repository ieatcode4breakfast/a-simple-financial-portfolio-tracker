import storage from '../utils/storage.js';

const marketData = {
  stored: storage.get('marketData') || [],

  getSingleQuote: async function(ticker) {
    const API_KEY = storage.get('apiKey') || '';

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

      if (response.status !== 200) {
        throw response.status;
      };

      const result = await response.json();

      const asset = this.buildAssetDetails(ticker, result);
      this.storeAsset(ticker, asset);
      return response.status;

    } catch (error) {
      console.error(`An error occured while retrieving market data:`, error);
      return error;
    }
  },

  getMultiQuote: async function(portfolio) {
    const API_KEY = storage.get('apiKey') || '';
    const tickers = portfolio.assets.map(asset => asset.ticker);
    const tickersString = tickers.join(',');

    try {
      const url = `https://yahoo-finance127.p.rapidapi.com/multi-quote/${tickersString}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);

      if (response.status !== 200) {
        throw response.status;
      };

      const result = await response.json();
      const resultArray = Object.entries(result); // Convert result from an object to an array

      tickers.forEach((ticker, index) => {
        const asset = this.buildAssetDetails(ticker, resultArray[index][1]);
        this.storeAsset(ticker, asset);
      });

      return response.status;

    } catch (error) {
      console.error('An error occured while updating market data:', error);
      return(error);
    }
  },

  buildAssetDetails: function(ticker, data) {
    const name = data.shortName || data.longName;
    const type = data.typeDisp;
    const lastPrice = Number(data.regularMarketPrice.raw);
    return { ticker, name, type, lastPrice };
  },

  storeAsset(ticker, asset) {
    // Filter out current ticker from stored data if already existing
    const filteredData = this.removeExisting(ticker, this.stored); 

    filteredData.push(asset);
    this.stored = filteredData;
    storage.set('marketData', this.stored);
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
