const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launchPersistentContext('/home/nemesis/.config/google-chrome/Default', {
        headless: false, // Set to true to run in headless mode
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' // Replace with desired user agent string
    });

    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/r/memes/');

    // Get HTML of all h3 elements with class _eYtD2XCVieq6emjKBH3m
    const h3Elements = await page.$$('h3._eYtD2XCVieq6emjKBH3m');
    for (let i = 0; i < h3Elements.length; i++) {
        const html = await h3Elements[i].outerHTML();
        console.log(html);
    }

    // Get HTML of all img elements with class _2_tDEnGMLxpM6uOa2kaDB3
    const imgElements = await page.$$('img._2_tDEnGMLxpM6uOa2kaDB3');
    for (let i = 0; i < imgElements.length; i++) {
        const html = await imgElements[i].outerHTML();
        console.log(html);
    }

    await new Promise(() => { });
})();
