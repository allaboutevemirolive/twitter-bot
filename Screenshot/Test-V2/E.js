const { chromium } = require('playwright');
const Jimp = require('jimp');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');
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

    // Define the corner radius (in pixels)
    const cornerRadius = 50;

    // Create a new mask image with the same dimensions as the padded image
    const mask = new Jimp(paddedImage.getWidth(), paddedImage.getHeight(), 0x00000000);

    // Draw a rounded rectangle onto the mask
    mask.roundedRectangle(0, 0, mask.getWidth(), mask.getHeight(), cornerRadius);

    // Apply the mask to the padded image
    paddedImage.mask(mask);

    // Save the padded image with rounded corners
    await paddedImage.writeAsync('screenshot.png');

    await browser.close();
})();
