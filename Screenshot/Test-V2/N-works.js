const { chromium } = require('playwright');
const Jimp = require('jimp');
const sharp = require('sharp');

(async () => {
    const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
        headless: false // Set to true to run in headless mode
    });
    const page = await browser.newPage();
    await page.goto('https://twitter.com/elonmusk/status/1646786045990633474?s=20');
    await page.waitForTimeout(2000);
    const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    await page.waitForTimeout(2000);
    const screenshot = await element.screenshot();

    // Load the screenshot into Jimp
    const image = await Jimp.read(screenshot);

    // Define the padding size
    const padding = 20;

    // Create a new image with the padded dimensions and white color
    const paddedImage = await new Jimp(image.getWidth() + padding * 2, image.getHeight() + padding * 2, 0xffffffff);

    // Paste the original screenshot into the padded image
    paddedImage.composite(image, padding, padding);

    // Apply a round corner mask to the screenshot using Sharp
    const screenshotBuffer = await paddedImage.getBufferAsync(Jimp.MIME_PNG);
    const roundedCornerBuffer = await sharp(screenshotBuffer)
        .resize({ width: 1200, height: 630, fit: 'cover' })
        .composite([{
            input: Buffer.from(`<svg><rect x="0" y="0" width="1200" height="630" rx="60" ry="60"/></svg>`),
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    await sharp(roundedCornerBuffer).toFile('screenshot.png');

    await new Promise(() => { });
})();
