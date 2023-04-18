const { chromium } = require('playwright');
const Jimp = require('jimp');
const sharp = require('sharp');


const line_1 = ('https://twitter.com/akmalfirdxus/status/1646610766840119296?s=20').split('/');

const line_3 = line_1[3];

const line_4 = line_1[5];

const line_5_initial = 'dark';

const line_6 = `https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2F${line_3}%2Fstatus%2F${line_4}%3Fs%3D20&theme=${line_5_initial}&widget=Tweet`;


(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(line_6);
    await page.waitForTimeout(3000);
    await page.waitForSelector('#twitter-widget-0');
    const iframe = await page.$('#twitter-widget-0');
    const targetURL = await iframe.getAttribute('src');
    await page.goto(targetURL);

    await page.waitForTimeout(3000);

    // Remove "Follow-current" element
    try {
        const followCurrent = await page.$('div.css-1dbjc4n.r-18u37iz.r-1q142lx');
        await followCurrent.evaluate(followCurrent => followCurrent.remove());

    } catch (error) {
        console.log('Follow-current not found');
    }

    // Remove "Follow-Upper" element
    try {

        const followUpper = await page.$('a.css-4rbku5.css-18t94o4.css-901oao.r-1loqt21.r-1qd0xha.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-qvutc0');
        await followUpper.evaluate(followUpper => followUpper.remove());
    } catch (error) {
        console.log('Follow-Upper not found');
    }

    // Find all elements with class "css-1dbjc4n r-18u37iz" and check if they contain
    // child elements matching the specified HTML structure
    try {
        const elements = await page.$$('div.css-1dbjc4n.r-18u37iz');
        for (const element of elements) {
            const html1 = await element.$('div[aria-hidden="true"] > span.css-901oao');
            const html2 = await element.$('a[href^="https://twitter.com/intent/follow"] > span.css-901oao');

            if (html1 && html2) {
                // Both child elements are present, so remove the parent div element
                await element.evaluate((el) => el.remove());
            }
        }
    } catch (error) {
        console.log('Follow-Upper not found');
    }


    // Remove "Copy link to tweet" element
    try {
        const copyLinkElement = await page.$('div.css-18t94o4.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-1ny4l3l.r-o7ynqc.r-6416eg');
        await copyLinkElement.evaluate(copyLinkElement => copyLinkElement.remove());

    } catch (error) {
        console.log('Copy link to tweet not found');
    }

    // Remove "Read 43 replies"
    try {
        const readReplies = await page.$('div.css-1dbjc4n.r-kzbkwu.r-1h8ys4a');
        await readReplies.evaluate(readReplies => readReplies.remove());

    } catch (error) {
        console.log('Read replies not found');
    }

    // Remove "Twitter ads info and privacy:"
    try {
        const linkAds = await page.$('a[href="https://help.twitter.com/en/twitter-for-websites-ads-info-and-privacy"]');
        await linkAds.evaluate(linkAds => linkAds.remove());
    } catch (error) {
        console.log('Twitter ads info and privacy not found');
    }

    await page.waitForTimeout(3000);

    // Wait for the article element to load
    await page.waitForSelector('article');

    // Get the article element
    const article = await page.$('article');

    // Get the width and height of the article element
    const { width, height } = await article.boundingBox();

    // Set the viewport size based on the article dimensions
    await page.setViewportSize({
        width: Math.round(width),
        height: Math.round(height),
    });

    await page.waitForTimeout(3000);

    // Take a screenshot of the article
    const ssimage = await article.screenshot();

    const newImage = await Jimp.read(ssimage);

    const screenshotBuffer = await newImage.getBufferAsync(Jimp.MIME_PNG);

    // Calculate the aspect ratio of the original screenshot
    const aspectRatio = width / height;

    // Calculate the new width and height based on the aspect ratio
    let newWidth, newHeight;
    if (aspectRatio > 1) {
        // Landscape orientation
        newWidth = 1200;
        newHeight = Math.round(1200 / aspectRatio);
    } else {
        // Portrait orientation
        newWidth = Math.round(630 * aspectRatio);
        newHeight = 630;
    }

    // Resize the image using the calculated width and height
    const roundedCornerBuffer = await sharp(screenshotBuffer)
        .resize(newWidth, newHeight, { fit: 'cover' })
        .composite([
            {
                input: Buffer.from(
                    `<svg><rect x="0" y="0" width="${newWidth}" height="${newHeight}" rx="22" ry="22"/></svg>`
                ),
                blend: 'dest-in',
            },
        ])
        .png()
        .toBuffer();

    await sharp(roundedCornerBuffer).toFile('screenshot.png');

    await new Promise(() => { });
})();
