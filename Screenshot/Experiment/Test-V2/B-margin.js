const { chromium } = require('playwright');
const Jimp = require('jimp');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/elonmusk/status/1646786045990633474?s=20');
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

    // Save the padded image
    await paddedImage.writeAsync('screenshot.png');

    await browser.close();
})();
