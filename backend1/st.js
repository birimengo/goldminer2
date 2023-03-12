const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    'https://www.sportybet.com/ug/sport/football/upcoming?time=0'
  );

  // do something on the page

  await browser.close();
})();
