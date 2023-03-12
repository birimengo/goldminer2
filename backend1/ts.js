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
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > span:nth-child(1) > label:nth-child(4)',
    ];

    for (const selector of checkboxSelectors) {
      await scrollToElement(page, selector);
      const checkboxElement = await page.$(selector);
      if (checkboxElement) {
        await checkboxElement.click({ delay: 300 });
      } else {
      }
    }

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

    //console.log('Markets and Odds:', marketsAndOdds);

    const input = marketsAndOdds.join('\n');
    const lines = input.split('\n');

    let soccerLines = [];
    let i = 0;

    while (i < lines.length) {
      if (lines[i].startsWith('SOCCER')) {
        soccerLines.push(lines[i]);
        i++;
        while (i < lines.length && !lines[i].startsWith('SOCCER')) {
          soccerLines.push(lines[i]);
          i++;
        }
      } else {
        i++;
      }
    }

    let soccer_dict = {};

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('SOCCER-')) {
        soccer_dict[lines[i]] = {};
      } else {
        continue;
      }
    }

    const soccer = {};

    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '1') {
        const key = lines[i - 1];
        soccer[key] = {};
        continue;
      }
    }

    console.log(soccer);

    console.log(soccer_dict);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}
getMarketsAndOdds();
