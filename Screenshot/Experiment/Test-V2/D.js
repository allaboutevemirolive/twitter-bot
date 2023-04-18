const { chromium } = require('playwright');
const Jimp = require('jimp');
const sharp = require('sharp');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');
    await page.waitForSelector('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    const screenshot = await element.screenshot();

    // Load the screenshot into Jimp
    const image = await Jimp.read(screenshot);

    // Define the padding size
    const padding = 50;

    // Create a new image with the padded dimensions and white color
    const paddedImage = await new Jimp(image.getWidth() + padding * 2, image.getHeight() + padding * 2, 0xffffffff);

    // Paste the original screenshot into the padded image
    paddedImage.composite(image, padding, padding);

    // Apply a round corner mask to the screenshot using Sharp
    const roundedCornerBuffer = await sharp(paddedImage.bitmap.buffer)
        .resize({ width: 1200, height: 630, fit: 'fill' })
        .composite([{
            input: Buffer.from(`<svg><rect x="0" y="0" width="1200" height="630" rx="60" ry="60"/></svg>`),
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    // Save the padded image
    const outputPath = path.join(__dirname, 'screenshot.png');
    await sharp(roundedCornerBuffer).toFile(outputPath);

    await browser.close();
})();
