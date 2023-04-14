const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
    headless: false, // Set to true to run in headless mode
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' // Replace with desired user agent string
  });

  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/memes/');

  await page.waitForTimeout(5000);

  const titleElement = await page.$('h3._eYtD2XCVieq6emjKBH3m');
  const title = await titleElement.innerText();

  // Get the link
  const linkElement = await page.$('a._2INHSNB8V5eaWp4P0rY_mE');
  const link = await linkElement.getAttribute('href');

  console.log(title, link);

  await new Promise(() => { });
})();
