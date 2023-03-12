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
    console.error(`Element not found: ${selector}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.fortebet.ug/#/app/offer/top');
    await page.waitForSelector('input[type="checkbox"]');

    console.log('Scrolling to checkboxes...');
    const checkboxSelectors = [
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > span:nth-child(1) > label:nth-child(4)',
      '.f16 > li:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > span:nth-child(1) > label:nth-child(4)',
    ];
    for (const selector of checkboxSelectors) {
      await scrollToElement(page, selector);
      const checkboxElement = await page.$(selector);
      if (checkboxElement) {
        console.log(`Clicking on checkbox ${selector}...`);
        await checkboxElement.click({ delay: 200 });
      } else {
        console.log(`Checkbox element not found: ${selector}`);
      }
    }
    console.log('Checkboxes clicked');

    await page.waitForSelector('#col-center');
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#col-center'));

      return rows.map((row) => {
        const matchCompetition = row
          .querySelector(
            '#col-center > ui-view:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2)'
          )
          .textContent.trim();
        const dateTime = row
          .querySelector(
            '#col-center > ui-view:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)'
          )
          .textContent.trim();
        const homeAndawayteam = Array.from(
          row.querySelectorAll(
            '#col-center > ui-view:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)'
          )
        ).map((hometeam) => hometeam.textContent.trim());
        const odds1 = Array.from(
          row.querySelectorAll(
            '#col-center > ui-view:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)'
          )
        ).map((oddsx) => oddsx.textContent.trim());
        const oddsx = Array.from(
          row.querySelectorAll(
            '#col-center > ui-view:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)'
          )
        ).map((odds2) => odds2c.textContent.trim());
        const odds2 = Array.from(
          row.querySelectorAll('div.active:nth-child(3)')
        ).map((odds1x) => odds1x.textContent.trim());

        return {
          matchCompetition,
          dateTime,
          homeAndawayteam,
          odds1,
          oddsx,
          odds2,
        };
      });
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
})();
