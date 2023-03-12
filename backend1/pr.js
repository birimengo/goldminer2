const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://paribet.ug/');

  // Take a screenshot of the page and save it as "paribet.png"e
  await page.screenshot({ path: 'paribet.png' });

  await browser.close();
})();
