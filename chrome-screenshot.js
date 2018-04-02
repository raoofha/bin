const puppeteer = require('puppeteer');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 5960, height: 4209})
    await page.goto('http://stackoverflow.com', {waitUntil: 'networkidle'});
    await timeout(10000)
    await page.screenshot({path: 'example.png'});
    browser.close();

})();
