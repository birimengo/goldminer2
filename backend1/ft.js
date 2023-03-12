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
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(6) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(7) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(8) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(9) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(10) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(11) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(12) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(13) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(14) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(15) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(16) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(17) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(18) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(19) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(20) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(21) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(22) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(23) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(24) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(25) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(26) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(27) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(28) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(29) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(30) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(31) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(32) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(33) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(34) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(35) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(36) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(37) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(38) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(39) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(40) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(41) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(42) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(43) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(44) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(46) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(45) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(46) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(47) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(48) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(49) > span:nth-child(1) > label:nth-child(4)',
      'li.ng-scope:nth-child(50) > span:nth-child(1) > label:nth-child(4)',
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
    await page.evaluate(async () => {
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
      return markets.map((market) => {
        const text = market.innerText;
        return text;
      });
    });

    console.log('Markets and Odds:', marketsAndOdds);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

getMarketsAndOdds();
