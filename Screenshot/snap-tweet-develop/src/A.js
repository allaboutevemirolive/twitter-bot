const playwright = require('playwright');

const getTweetUrl = (username, tweetId) => `https://twitter.com/${username}/status/${tweetId}`;

(async () => {
    const browser = await playwright.chromium.launch({
        headless: true,
    });

    const context = await browser.newContext();

    const page = await context.newPage();
    await page.setViewportSize({ width: 1200, height: 800 });

    const tweetUrl = getTweetUrl('elonmusk', '1445787057122287108');

    await page.goto(tweetUrl, { waitUntil: 'networkidle' });

    const tweetContainer = await page.waitForSelector('[data-testid="tweet"]');
    await tweetContainer.screenshot({ path: 'tweet.png' });

    await browser.close();
})();
