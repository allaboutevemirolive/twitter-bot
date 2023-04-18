const { chromium } = require('playwright');
const Jimp = require('jimp');
const sharp = require('sharp');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // Target targetURL
    const targetURL = 'https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-4&features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&frame=false&hideCard=false&hideThread=false&id=1647983942136643584&lang=en&origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fakmalfirdxus%252Fstatus%252F1646610766840119296%26theme%3Ddark%26widget%3DTweet&sessionId=21384c3c7baf5ec3a2c7e55e71d61d5e696e6e6a&theme=dark&widgetsVersion=aaf4084522e3a%3A1674595607486&width=550px';

    // Create a new page and navigate to the target targetURL
    const page = await context.newPage();
    await page.goto(targetURL);

    await page.waitForTimeout(3000);

    // Remove "Follow" element
    const followElement = await page.$('div.css-1dbjc4n.r-18u37iz.r-1q142lx');
    await followElement.evaluate(followElement => followElement.remove());

    // Remove "Copy link to tweet" element
    const copyLinkElement = await page.$('div.css-18t94o4.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-1ny4l3l.r-o7ynqc.r-6416eg');
    await copyLinkElement.evaluate(copyLinkElement => copyLinkElement.remove());

    // Remove "Read 43 replies"
    const readReplies = await page.$('div.css-1dbjc4n.r-kzbkwu.r-1h8ys4a');
    await readReplies.evaluate(readReplies => readReplies.remove());


    // Remove "Twitter ads info and privacy:"
    const linkAds = await page.$('a[href="https://help.twitter.com/en/twitter-for-websites-ads-info-and-privacy"]');
    await linkAds.evaluate(linkAds => linkAds.remove());

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
                    `<svg><rect x="0" y="0" width="${newWidth}" height="${newHeight}" rx="10" ry="10"/></svg>`
                ),
                blend: 'dest-in',
            },
        ])
        .png()
        .toBuffer();

    await sharp(roundedCornerBuffer).toFile('screenshot.png');

    await new Promise(() => { });
})();
