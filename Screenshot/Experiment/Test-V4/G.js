const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // Target URL
    const url = 'https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Felonmusk%2Fstatus%2F1648135878454177794%3Fs%3D20&theme=dark&widget=Tweet';

    // Create a new page and navigate to the target URL
    const page = await context.newPage();
    await page.goto(url);

    // Wait for the iframe to load
    await page.waitForSelector('iframe');

    // Get the iframe element
    const iframe = await page.$('iframe');

    // Get the width and height of the iframe element
    const { width, height } = await iframe.boundingBox();

    // Set the viewport size based on the iframe dimensions
    await page.setViewportSize({
        width: Math.round(width),
        height: Math.round(height)
    });

    // Get the text content of the iframe, trim it, and set it back as the inner HTML
    const iframeHandle = await iframe.contentFrame();
    const iframeText = await iframeHandle.$eval('body', (body) => body.innerText.trim());
    await iframeHandle.evaluate((body, text) => {
        body.innerHTML = text;
    }, iframeText);

    // Take a screenshot of the iframe
    await iframe.screenshot({ path: 'screenshot.png' });

    await new Promise(() => { });
})();
