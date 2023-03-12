const puppeteer = require('puppeteer');

async function scrape(url, cssSelector) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
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

  // Wait for the target element to appear on the page
  await page.waitForSelector(cssSelector);

  // Extract the data from the target element
  const elements = await page.$$(cssSelector);
  const data = await Promise.all(
    elements.map(async (element) => {
      const text = await page.evaluate((el) => el.innerText, element);
      return text.trim();
    })
  );

  await browser.close();
  return data;
}

const url = 'https://gsb.ug/#/sports/sportsBetting';
const cssSelector =
  'div.upcoming-container > eventslistwithsportfilter:nth-child(2) > div:nth-child(1) > ul:nth-child(2)';
scrape(url, cssSelector)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
