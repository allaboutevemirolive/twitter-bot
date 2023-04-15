const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.reddit.com/r/memes/');
    await page.waitForSelector('a[href*="/r/memes/comments/"]');

    const titleSelector = 'h3._eYtD2XCVieq6emjKBH3m';
    await page.waitForSelector(titleSelector);

    const titles = await page.$$eval(titleSelector, (elements) => {
        return elements.map((element) => element.textContent);
    });

    console.log(titles);

    await new Promise(() => { });
})();
