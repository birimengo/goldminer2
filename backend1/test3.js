const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.betpawa.ug/live');

  // Wait for page to load
  await page.waitForSelector('.generic-page-content-wrapper', { timeout: 0 });

  // Get the inner text of the element with class 'generic-page-content-wrapper'
  const element = await page.$('.generic-page-content-wrapper');
  const text = await page.evaluate((element) => element.innerText, element);

  // Split the text into an array of non-empty lines
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  console.log(lines);

  await browser.close();
})();
