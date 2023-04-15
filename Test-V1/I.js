const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
        headless: false, // Set to true to run in headless mode
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' // Replace with desired user agent string
    });

    const page = await browser.newPage();

    // navigate to the target page
    await page.goto('https://www.reddit.com/r/memes/');

    const firstPostTitle = await page.$eval('[data-adclicklocation="title"]', (element) => element.innerText);
    const firstPostLink = await page.$eval('[data-adclicklocation="title"]', (element) => {
        const link = element.querySelector('a');
        if (link.href.startsWith('https://preview.redd.it/')) {
            return link.href;
        } else {
            return null;
        }
    });

    console.log('First post title:', firstPostTitle);
    console.log('First post link:', firstPostLink);

    await browser.close();
})();
