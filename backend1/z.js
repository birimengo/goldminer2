const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.sportybet.com/ug/sport/football/upcoming?time=0'
  );

  const matchData = await page.$$eval('.importMatch', (matches) =>
    matches.map((match) => match.innerText.trim())
  );

  console.log(matchData);

  await browser.close();
})();
