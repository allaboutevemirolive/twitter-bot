const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the page containing the HTML
    await page.goto('https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fakmalfirdxus%2Fstatus%2F1646610766840119296&theme=dark&widget=Tweet');

    await page.waitForTimeout(3000);

    // Wait for the div containing the Twitter link to be visible
    await page.waitForSelector('iframe.css-1dbjc4n.r-13awgt0.r-12vffkv');

    // Take a screenshot of the div
    const element = await page.$('iframe.css-1dbjc4n.r-13awgt0.r-12vffkv');
    await element.screenshot({ path: 'twitter.png' });

    // Close the browser
    await browser.close();
})();
