const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false});
  const page = await browser.newPage();
  await page.goto('https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fakmalfirdxus%2Fstatus%2F1646610766840119296&theme=dark&widget=Tweet');
//   await page.waitForTimeout(5000);
//   // Wait for the element to appear
//   await page.waitForSelector('.css-1dbjc4n');

//   // Take a screenshot of the element
//   await page.screenshot({ path: 'screenshot.png' });

  await new Promise(() => { });
})();
