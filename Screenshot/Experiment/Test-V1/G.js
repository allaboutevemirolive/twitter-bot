const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');
  
  // Wait for the tweet to be fully loaded
  await page.waitForSelector('.css-1dbjc4n');
  
  // Get the bounding box of the tweet element
  const tweetElement = await page.$('.css-901oao.r-1nao33i.r-37j5jr.r-1inkyih.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0');
   // Get a handle to the tweet text element
   const tweetTextElement = await page.$('.css-901oao.r-1nao33i.r-37j5jr.r-1inkyih.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0');
  
   // Take a screenshot of the tweet text element
   await tweetTextElement.screenshot({ path: 'screenshot.png' });
  
  await browser.close();
})();
