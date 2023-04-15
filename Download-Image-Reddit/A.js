const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/r/memes/comments/12la73u/ai_rebellion/?utm_source=share&utm_medium=web2x&context=3');
    await page.waitForSelector('img[alt="The AI Rebellion"]');
    const image = await page.$('img[alt="The AI Rebellion"]');
    await image.screenshot({ path: 'ai-rebellion.png' });
    await browser.close();
})();
