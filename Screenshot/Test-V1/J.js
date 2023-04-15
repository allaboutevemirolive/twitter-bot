const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/CommunityNotes/status/1647021207563431936');

    // Add custom CSS styles to the page
    await page.addStyleTag({
        content: `
      body {
        background: white;
      }
      .css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2 {
        border-radius: 20px;
        overflow: hidden;
        clip-path: polygon(
          20px 0,
          100% 0,
          100% calc(100% - 20px),
          calc(100% - 20px) 100%,
          0 100%,
          0 20px
        );
      }
    `
    });

    const element = await page.$('.css-1dbjc4n.r-eqz5dr.r-16y2uox.r-1wbh5a2');
    await element.screenshot({ path: 'screenshot.png' });
    await browser.close();
})();
