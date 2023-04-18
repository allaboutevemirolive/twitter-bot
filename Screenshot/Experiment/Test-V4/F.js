const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // Target URL
    const url =
        'https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Felonmusk%2Fstatus%2F1648135878454177794%3Fs%3D20&theme=dark&widget=Tweet';

    // Create a new page and navigate to the target URL
    const page = await context.newPage();
    await page.goto(url);

    await page.waitForTimeout(5000);

    // Wait for the iframe to load
    await page.waitForSelector('iframe');

    // Get the iframe element
    const iframe = await page.$('iframe');

    // Get the width and height of the iframe element
    const { width, height } = await iframe.boundingBox();

    // Set the viewport size based on the iframe dimensions
    await page.setViewportSize({
        width: Math.round(width),
        height: Math.round(height),
    });

    // Take a screenshot of the iframe
    const screenshot = await iframe.screenshot();

    // Get the bounding box of the body element inside the iframe
    const bodyBoundingBox = await iframe.$eval('body', (body) => {
        const { x, y, width, height } = body.getBoundingClientRect();
        return { x, y, width, height };
    });

    // Calculate the dimensions and position of the body element relative to the iframe
    const { x: bodyX, y: bodyY, width: bodyWidth, height: bodyHeight } = bodyBoundingBox;

    // Calculate the dimensions and position of the body element relative to the page
    const { x: bodyPageX, y: bodyPageY } = await iframe.evaluate((body) => {
        const { x, y } = body.getBoundingClientRect();
        return { x, y };
    }, await iframe.$('body'));

    // Calculate the dimensions and position of the body element relative to the screenshot
    const { x, y } = await iframe.evaluate(
        ({ bodyX, bodyY, bodyPageX, bodyPageY }) => {
            return {
                x: bodyPageX - bodyX,
                y: bodyPageY - bodyY,
            };
        },
        { bodyX, bodyY, bodyPageX, bodyPageY }
    );

    // Crop the screenshot to the dimensions of the body element
    const croppedScreenshot = await screenshot.clip({ x, y, width: bodyWidth, height: bodyHeight });

    // Save the cropped screenshot to a file
    await croppedScreenshot.saveAs('screenshot.png');

    await browser.close();
})();
