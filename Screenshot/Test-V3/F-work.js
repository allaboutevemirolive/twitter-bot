const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fakmalfirdxus%2Fstatus%2F1646610766840119296&theme=dark&widget=Tweet');
  await page.waitForTimeout(2000);
  const iframeHandle = await page.waitForSelector('iframe');
  const iframeContent = await iframeHandle.contentFrame();

  await iframeContent.waitForLoadState();
  await iframeHandle.screenshot({ path: 'tweet.png' });

  await new Promise(() => { });
})();
