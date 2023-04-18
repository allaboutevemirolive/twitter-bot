const { chromium } = require('playwright');

const line_1 = ('https://twitter.com/akmalfirdxus/status/1646610766840119296?s=20').split('/');

const line_3 = line_1[3];

const line_4 = line_1[5];

const line_5_initial = 'dark';

const line_6 = `https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2F${line_3}%2Fstatus%2F${line_4}%3Fs%3D20&theme=${line_5_initial}&widget=Tweet`;

(async () => {
    const browser = await chromium.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto(line_6);
    await page.waitForTimeout(3000);
    await page.waitForSelector('#twitter-widget-0');
    const iframe = await page.$('#twitter-widget-0');
    const targetLink = await iframe.getAttribute('src');
    await page.goto(targetLink);
    console.log(targetLink);
    await new Promise(() => { });
})();
