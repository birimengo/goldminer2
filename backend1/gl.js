const puppeteer = require('puppeteer');

async function scrape(url, cssSelector) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 800 });

  await page.goto(url);

  // Click the "Show More" button repeatedly until it is no longer visible on the page
  while (true) {
    // Wait for the button to appear on the page
    await page.waitForSelector(
      '.upcoming-container > eventslistwithsportfilter:nth-child(2) > div:nth-child(1) > button:nth-child(3)'
    );

    // Click the button using page.evaluate()
    await page.evaluate(() => {
      // Find the button element using JavaScript code
      const button = document.querySelector(
        '.upcoming-container > eventslistwithsportfilter:nth-child(2) > div:nth-child(1) > button:nth-child(3)'
      );

      // Trigger a click event on the button element
      button.click();
    });

    // Wait for some time after clicking the button to give the page a chance to load new content
    await page.waitForTimeout(1000);

    // Check if the "Show More" button is still visible on the page
    const button = await page.$(
      '.upcoming-container > eventslistwithsportfilter:nth-child(2) > div:nth-child(1) > button:nth-child(3)'
    );
    if (!button) {
      break;
    }
  }

  let parts; // Declare the parts variable in the outer scope

  // Extract the data from the target element
  const elements = await page.$$(cssSelector);
  await Promise.all(
    elements.map(async (element) => {
      const text = await page.evaluate((el) => el.innerText, element);
      parts = text.split('\n'); // Assign the value to the parts variable
    })
  );

  let tournament = null;
  // let country_leagues = [];
  // let country_soccer = [];

  for (let i = 0; i < parts.length; i++) {
    const line = parts[i];

    if (line.startsWith('+')) {
      tournament = {
        //country_soccer: country_soccer[country_soccer.length - 1],
        // country_league: country_leagues[country_leagues.length - 1],
        date_and_time: parts[i - 13],
        home_team: parts[i - 12],
        away_team: parts[i - 10],
        odd1: parts[i - 9],
        oddx: parts[i - 8],
        odd2: parts[i - 7],
        under_2_5: parts[i - 5],
        over_2_5: parts[i - 4],
        odd1x: parts[i - 3],
        oddx2: parts[i - 2],
        odd12: parts[i - 1],
        others: line.slice(0).trim(),
      };
      console.log(tournament);
    }
  }

  await browser.close();
  return tournament;
}

const url = 'https://gsb.ug/#/sports/sportsBetting';
const cssSelector =
  'div.upcoming-container > eventslistwithsportfilter:nth-child(2) > div:nth-child(1) > ul:nth-child(2)';
scrape(url, cssSelector)
  .then(function (tournament) {
    console.log(tournament);
  })
  .catch(function (err) {
    console.error(err);
  });

