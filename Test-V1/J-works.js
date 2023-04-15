const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
        headless: false, // Set to true to run in headless mode
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' // Replace with desired user agent string
    });

    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/r/memes/');

    // Get HTML 1
    const html1 = await page.$eval('h3._eYtD2XCVieq6emjKBH3m', el => el.outerHTML);
    console.log(html1);

    // Get HTML 2
    const html2 = await page.$eval('img._2_tDEnGMLxpM6uOa2kaDB3', el => el.outerHTML);
    console.log(html2);

    await new Promise(() => { });
})();
