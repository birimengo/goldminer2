const puppeteer = require('puppeteer');

async function getMarketsAndOdds() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://paribet.ug/LiveNow');

  await page.waitForSelector('#LiveNow');

  const marketsAndOdds = await page.evaluate(() => {
    const markets = Array.from(document.querySelectorAll('#LiveNow'));
    return markets.map((market) => {
      const text = market.innerText;
    });
  });

  console.log(marketsAndOdds);
  await browser.close();
}

getMarketsAndOdds();
