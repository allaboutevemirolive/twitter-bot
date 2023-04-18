const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');

  const tweetElement = await page.$('div[data-testid="tweet"] span.css-901oao');

  await tweetElement.screenshot({ path: 'tweet.png' });

  await browser.close();
})();
