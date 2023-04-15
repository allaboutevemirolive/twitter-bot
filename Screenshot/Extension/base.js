const { test } = require('@playwright/test');

// Define a base test that launches a browser and creates a page
const base = test.extend({
    browserName: 'chromium',
    page: async ({ browser }) => {
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1280, height: 720 });
        return page;
    },
    contextOptions: {
        viewport: { width: 1280, height: 720 },
    },
});

module.exports = base;
