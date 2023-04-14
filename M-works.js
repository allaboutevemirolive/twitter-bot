const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
        headless: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36'
    });

    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/r/memes/');

    // Get all matching elements
    const elements = await page.$$eval('h3._eYtD2XCVieq6emjKBH3m, img._2_tDEnGMLxpM6uOa2kaDB3', els => els.map(el => el.outerHTML));

    // Loop through the elements and print their outerHTML
    elements.forEach(element => {
        console.log(element+'\n');
    });

    await new Promise(() => { });
})();
