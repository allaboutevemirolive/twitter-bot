const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');
  const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
  // css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2
  await element.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
