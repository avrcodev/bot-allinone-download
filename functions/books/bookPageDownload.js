const puppeteer = require('puppeteer');
const { logs } = require('../utils');
const { menuHome } = require('../../resources/menus');
const finalBookStep = require('./finalBookStep');

module.exports = async function (ctx, book) {

    try {
        logs({ text: `Book to download: ${JSON.stringify(book)}` })

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // go page
        await page.goto(book.link, { waitUntil: 'networkidle2' });

        // wait response
        await page.waitForSelector('input[id="download2"]');

        // click download button pdf and detect new window
        const [newPage] = await Promise.all([
            new Promise(resolve => browser.once('targetcreated', async target => resolve(await target.page()))),
            page.click('input[id="download2"]'),
        ]);

        await newPage.bringToFront();
        await newPage.waitForNavigation({ waitUntil: 'networkidle2' });
        const finalUrl = newPage.url();
        finalBookStep(ctx, finalUrl, book)

        await browser.close();
    } catch (error) {
        log(error)
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
