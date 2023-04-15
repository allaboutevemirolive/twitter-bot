const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    // Launch a new browser instance
    const browser = await chromium.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the Reddit post URL
    await page.goto('https://www.reddit.com/r/memes/comments/12lhp1t/a_woman_of_culture/');

    // Find the HTML element that contains the image
    const imgElement = await page.$('img.ImageBox-image');

    // Get the image source URL from the HTML element
    const imgUrl = await imgElement.getAttribute('src');

    // Download the image
    const buffer = await page.waitForEvent('download');
    fs.writeFileSync('image.jpg', buffer);

    // Close the browser instance
    await browser.close();
})();
