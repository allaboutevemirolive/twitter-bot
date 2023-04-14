const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
    headless: false // Set to true to run in headless mode
  });

  const page = await browser.newPage();
  await page.goto('https://twitter.com/home');

  await page.waitForTimeout(5000);

  const tweetTextarea = await page.$('[data-testid="tweetTextarea_0"]');
  await tweetTextarea.fill('with fake user');

  const targetElement = await page.$('div.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-37j5jr.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0[dir="ltr"] span.css-901oao.css-16my406.css-1hf3ou5.r-poiln3.r-a023e6.r-rjixqe.r-bcqeeo.r-qvutc0');
  await targetElement.click();

  await new Promise(() => { });
})();
