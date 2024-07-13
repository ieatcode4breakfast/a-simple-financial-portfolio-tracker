<h1>A Simple Financial Portfolio Tracker</h1>

I started my programming journey around May 2024 and this project, which was finished mid-July 2024, serves as a final exercise to apply everything that I’ve learned from studying HTML, CSS, and JavaScript before I eventually move on to learning frameworks. This is my very first fully functional and responsive web application created using vanilla HTML, CSS and JavaScript.  It works on desktop as well as mobile browsers. 

### **Getting started:**

This portfolio tracker and all its features are published and available on GitHub pages so you can start using it here:

https://ieatcode4breakfast.github.io/a-simple-financial-portfolio-tracker/

The only other thing you need is an API key. This app uses Stock Pulse API by Manwil Zaki from [rapidapi.com](http://rapidapi.com) to fetch financial data. You can click on the link below to visit the API page, sign up to Rapid API, and get a free API key for testing:

https://rapidapi.com/manwilbahaa/api/yahoo-finance127/

### Features and how to use:

- Supports stocks, ETFs, and cryptocurrency.
- You can add, edit, and remove assets. To add an asset, you need to enter the ticker symbol, the total cost of your position (including fees which is up to you), and the number of shares/units that you own. You can edit an asset by clicking on it and you can remove by clicking on the delete button at the end of each asset details.
- When adding an asset, the asset name, type and last price are initially fetched using Stock Pulse API. Once data is fetched, it is stored locally and referenced to optimize API key usage.
- % of Portfolio, Current Value, Average Price, Profit/Loss and Profit/Loss % are automatically calculated based on the input details and market data.
- Update the prices at any time by clicking on Update Market Data. It fetches the latest available market data for all the assets in the portfolio in a single API request.
- Sort assets by any asset detail or metric by clicking on any column header.
- Edit the cash balance by clicking on Edit Cash Balance.
- Edit the API key you are using at any time by clicking on Edit API Key.
- Finally, you can reset the portfolio and start over by clicking on Reset Portfolio.

### Additional thoughts:

- As mentioned in the intro, this project was created as a final exercise to conclude my HTML, CSS and JavaScript study. Although I used AI extensively to assist me in my study and creating this project, I coded everything by myself and didn’t copy and paste a single line of code. I mostly used AI to help explain and clarify concepts, check obvious mistakes, and discuss possible solutions when I’m stuck on a problem. I tried not to use code I didn’t understand. I either didn’t use it or did my best to understand it before using it.

- Other than installing Jest and using an API, I didn’t use external libraries or frameworks. Everything is vanilla HTML, CSS, and JavaScript. All components, input validation, utils and other stuff were created by me.

- I tried to use an **object-oriented** approach so I can practice and increase my understanding of OOP principles. I used objects and classes extensively in this project and got to utilize important concepts like abstraction, encapsulation, inheritance and polymorphism. 

- Unfortunately, although I installed Jest, I didn’t get to use it that much. I mostly tested everything manually to make sure they were working. In the future, I plan to learn and incorporate testing and testing frameworks more into my workflow.

- Finally, I would like to share the main resources I used in learning HTML, CSS and JavaScript. Actually, it’s all mostly courses and videos by SuperSimpleDev on YouTube.

  - HTML and CSS - https://www.youtube.com/watch?v=G3e-cpL7ofc

  - JavaScript - https://www.youtube.com/watch?v=G3e-cpL7ofc

  These courses are great starting points if you want to get into programming and web development but have no idea where to start.
