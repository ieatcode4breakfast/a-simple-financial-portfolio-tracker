import storage from '../utils/storage.js';

const API_KEY = '9672bea8b6msh08311a0bf49ad01p1b108ajsn852635995062';

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
      const asset = this.buildAssetDetails(ticker, result);

      // Filter out current ticker from stored ata if already existing
      const filteredData = this.removeExisting(ticker, this.stored); 

      filteredData.push(asset);
      this.stored = filteredData;
      storage.set('marketData', this.stored);

    } catch (error) {
      console.error(`An error occured while retrieving market data for ticker symbol ${ticker}`, error);
    }
  },

  getMultiQuote: async function(portfolio) {
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
      const result = await response.json();

      const resultArray = Object.entries(result);
      
      tickers.forEach((ticker, index) => {
        const asset = this.buildAssetDetails(ticker, resultArray[index][1]);
        console.log(asset);
      });
    } catch (error) {
      console.error('An error occured while updating market data.', error);
    }
  },

  buildAssetDetails: function(ticker, data) {
    const name = data.shortName || longName;
    const type = data.typeDisp;
    const lastPrice = Number(data.regularMarketPrice.raw);

    return { ticker, name, type, lastPrice };
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