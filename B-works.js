const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
    headless: false, // Set to true to run in headless mode
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' // Replace with desired user agent string
  });

  const page = await browser.newPage();
  await page.goto('https://twitter.com/compose/tweet');

  await page.waitForTimeout(5000);

  // const targetElement = await page.$('div[data-offset-key="6cbi4-0-0"]');
  const tweetTextarea = await page.$('[data-testid="tweetTextarea_0"]');
  await tweetTextarea.focus();
  await tweetTextarea.fill('Nugget');
  // await page.keyboard.type('with fake user');

  const targetElement = await page.$('div.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-37j5jr.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0[dir="ltr"] span.css-901oao.css-16my406.css-1hf3ou5.r-poiln3.r-a023e6.r-rjixqe.r-bcqeeo.r-qvutc0');
  await targetElement.click();

  await new Promise(() => { });
})();
