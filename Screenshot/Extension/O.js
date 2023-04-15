const { test: base, chromium, webkit } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, './Screenshot') // make sure this is correct

const test = base.extend({
    context: async ({ browserName }, use) => {
        const browserTypes = { chromium, webkit }
        const launchOptions = {
            devtools: true,
            headless: false,
            args: [
                `--disable-extensions-except=${extensionPath}`
            ],
            viewport: {
                width: 1920,
                height: 1080
            }
        }
        const context = await browserTypes[browserName].launchPersistentContext(
            '',
            launchOptions
        )
        await use(context)
        await context.close()
    }
})

test.describe('Popup', () => {
    test('our extension loads', async ({ page }) => {
        await page.goto(
            'chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/popup.html'
        )
        await page.waitForTimeout(30000) // this is here so that it won't automatically close the browser window
    })
})