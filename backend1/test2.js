const puppeteer = require('puppeteer');

async function scrollToElement(page, selector) {
  const element = await page.$(selector);
  if (element) {
    await page.evaluate((el) => {
      el.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }, element);
  } else {
    // console.error(`Element not found: ${selector}`);
  }
}

async function getMarketsAndOdds() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.fortebet.ug/#/app/offer/top');
    await page.waitForSelector('input[type="checkbox"]');

    const checkboxSelectors = [
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > span:nth-child(1) > label:nth-child(4)',
    ];

    //console.log('Scrolling to checkboxes...');
    for (const selector of checkboxSelectors) {
      await scrollToElement(page, selector);
      const checkboxElement = await page.$(selector);
      if (checkboxElement) {
        //  console.log(`Clicking on checkbox ${selector}...`);
        await checkboxElement.click({ delay: 300 });
      } else {
        // console.log(`Checkbox element not found: ${selector}`);
      }
    }
    // console.log('Checkboxes clicked');

    // console.log('Scrolling to bottom of page...');
    page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    const marketsAndOdds = await page.evaluate(() => {
      const markets = Array.from(
        document.querySelectorAll(
          '#col-center > ui-view:nth-child(1) > div:nth-child(1)'
        )
      );
      let result = '';
      markets.forEach((market) => {
        result += market.innerText;
      });
      return result;
    });

    console.log('Markets and Odds:', marketsAndOdds);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}
getMarketsAndOdds();
