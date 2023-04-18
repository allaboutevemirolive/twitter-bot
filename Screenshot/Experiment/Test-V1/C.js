const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`file://${__dirname}/example.html`);
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
})();
