const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-2&features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&frame=false&hideCard=false&hideThread=false&id=1647846016522104833&lang=en&origin=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fakmalfirdxus%252Fstatus%252F1646610766840119296%26theme%3Ddark%26widget%3DTweet&sessionId=21384c3c7baf5ec3a2c7e55e71d61d5e696e6e6a&theme=dark&widgetsVersion=aaf4084522e3a%3A1674595607486&width=550px'); // Replace with the URL of the HTML page

    await page.waitForTimeout(3000);
    
    // Remove the "Follow" element
    await page.evaluate(() => {
        const follow = document.querySelector('span:contains("Follow")');
        if (follow) {
            follow.parentElement.remove();
        }
    });

    // Remove the "Link below" element
    await page.evaluate(() => {
        const linkBelow = document.querySelector('span:contains("Read 42 replies")');
        if (linkBelow) {
            linkBelow.closest('a').remove();
        }
    });

    // Remove the "Copy link to tweet" element
    await page.evaluate(() => {
        const copyLink = document.querySelector('.css-18t94o4.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-1ny4l3l.r-o7ynqc.r-6416eg');
        if (copyLink) {
            copyLink.closest('div').remove();
        }
    });

    // Remove the "Info(!)" element
    await page.evaluate(() => {
        const info = document.querySelector('span:contains("Info(!)")');
        if (info) {
            info.closest('div').remove();
        }
    });

    await new Promise(() => { });
})();