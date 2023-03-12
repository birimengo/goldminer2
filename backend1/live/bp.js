const puppeteer = require('puppeteer');

async function getMarketsAndOdds() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.betpawa.ug/live');

  await page.waitForSelector('div.events-container');

  const marketsAndOdds = await page.evaluate(() => {
    const markets = Array.from(
      document.querySelectorAll('div.events-container')
    );
    return markets.map((market) => {
      const text = market.innerText;
      const lines = text.split('\n').filter((line) => line.trim().length > 0);
      return {
        DateAndTime: lines[0].replace("'", ''),
        HomeTeam: lines[1],
        AwayTeam: lines[2],
        Competition: lines[3],
        Odds1: lines[5],
        OddsX: lines[7],
        Odds2: lines[9],
      };
    });
  });

  console.log(JSON.stringify(marketsAndOdds, null, 2));
  await browser.close();
}

getMarketsAndOdds();
