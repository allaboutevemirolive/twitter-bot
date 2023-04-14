const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.reddit.com/r/memes/');
    await page.waitForSelector('a[href*="/r/memes/comments/"]');


    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h3._eYtD2XCVieq6emjKBH3m');
    const title = await page.$eval('h3._eYtD2XCVieq6emjKBH3m', (element) => element.textContent);

    console.log(title);

    await new Promise(() => { });
})();
