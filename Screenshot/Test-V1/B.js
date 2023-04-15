const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const element = await page.$('#my-element');
    await element.screenshot({ path: 'screenshot2.png' });
    await browser.close();
})();
