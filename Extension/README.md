```
How to install extension uBlockOrigin with playwright in chromium
```



1. Download the uBlock Origin extension from the Chrome Web Store or from the uBlock Origin GitHub repository.
- Download zip file from uBlock repository

2. Extract the extension files to a directory on your system. For example, if you downloaded the extension as a ZIP file and extracted it to your Downloads folder, the path to the extension might be: `~/Downloads/uBlock0.chromium`.

2. Update the `pathToExtension` variable in the code to point to the directory where you extracted the extension. For example:

```
const pathToExtension = '~/Downloads/uBlock0.chromium';
```
3. Save the updated code to a file on your system, for example, `load-ublock.js`.

4. Open a terminal window and navigate to the directory where you saved the `load-ublock.js` file.

4. Run the code by executing the following command:
```
node load-ublock.js
```
This will launch a new Chromium instance with uBlock Origin loaded as an extension.



## Code Example

```javascript
const { chromium } = require('playwright');

(async () => {
    // Better extract the folder repo same as the code that you want to execute
    const pathToExtension = require('path').join(__dirname, './uBlock0.chromium');
    const userDataDir = '/tmp/test-user-data-dir';
    const browserContext = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`
        ]
    });
    let [backgroundPage] = browserContext.backgroundPages();
    if (!backgroundPage)
        backgroundPage = await browserContext.waitForEvent('backgroundpage');

    // Test the background page as you would any other page.
    await new Promise(() => { });
})();

```



## Check:

https://github.com/gorhill/uBlock

https://playwright.dev/docs/chrome-extensions

