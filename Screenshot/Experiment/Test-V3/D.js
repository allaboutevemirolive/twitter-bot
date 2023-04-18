const { chromium } = require('playwright');
const Jimp = require('jimp');
const sharp = require('sharp');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fakmalfirdxus%2Fstatus%2F1646610766840119296&theme=dark&widget=Tweet');
    await page.waitForTimeout(3000);
    const iframeHandle = await page.waitForSelector('iframe');
    const iframeContent = await iframeHandle.contentFrame();

    await iframeContent.waitForLoadState();

    const screenshotBuffer = await iframeContent.screenshot({ type: 'png' });
    const roundedCornerBuffer = await sharp(screenshotBuffer)
        .resize({ width: 1200, height: 630, fit: 'cover' })
        .composite([{
            input: Buffer.from(`<svg><rect x="0" y="0" width="1200" height="630" rx="60" ry="60"/></svg>`),
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    await sharp(roundedCornerBuffer).toFile('screenshot.png');

    await browser.close();
})();
