const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');

    // Add a border-radius style to the element
    await page.addStyleTag({ content: '.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2 { border-radius: 60px; }' });

    const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    const screenshotBuffer = await element.screenshot();

    // Apply a round corner mask to the screenshot using Sharp
    const roundedCornerBuffer = await sharp(screenshotBuffer)
        .resize({ width: 1200, height: 630, fit: 'fill' })
        .composite([{
            input: Buffer.from(`<svg><rect x="0" y="0" width="1200" height="630" rx="60" ry="60"/></svg>`),
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    await sharp(roundedCornerBuffer).toFile('screenshot.png');
    await browser.close();
})();
