const { chromium } = require('playwright');

const fs = require('fs');


(async () => {
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();
    const link1 = "https://twitter.com/akmalfirdxus/status/1646610766840119296";
    const url = new URL(link1);

    const pathParts = url.pathname.split("/");
    const code1 = pathParts[1];
    const code2 = pathParts[3];
    const code3 = "dark"; // You can set this to any value you like

    const link_code = `https://publish.twitter.com/?query=${link1}&theme=${code3}&widget=Tweet`;

    await page.goto(link_code);
    await page.waitForTimeout(10000);

    const element = await page.$('.twitter-widget-0');
    await page.waitForTimeout(2000);
    const screenshot = await element.screenshot();

    fs.writeFileSync('screenshot.png', screenshot);


    await new Promise(() => { });
})();
