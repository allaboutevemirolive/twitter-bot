const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');
    const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    await page.evaluate(el => {
        el.style.margin = '50px'; // add margin around the element
    }, element);
    await element.screenshot({ path: 'screenshot.png' });
    await browser.close();
})();
