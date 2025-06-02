const puppeteer = require('puppeteer');
const { logs, pdfGetPuppeter } = require('../utils');
const path = require('path');
const fs = require('fs');
const { menuHome } = require('../../resources/menus');

module.exports = async function (ctx, url, book) {

    try {
        logs({ text: `URL end: ${url}` })

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // go page
        await page.goto(url, { waitUntil: 'networkidle2' });

        // wait to button
        await page.waitForSelector('#downloadB', { visible: true });

        // get URL pdf
        let relativeUrl = await page.$eval('#fileDownload a#downloadB', el => el.getAttribute('href'));
        relativeUrl = "https://www.antupload.com/" + relativeUrl

        await browser.close();

        logs({ text: `download local pdf URL: ${relativeUrl}` });

        const pathFiles = path.resolve(__dirname, 'files');
        if (!fs.existsSync(pathFiles)) fs.mkdirSync(pathFiles);

        // download pdf with puppeter
        const fileLocal = await pdfGetPuppeter(relativeUrl, pathFiles);

        await ctx.reply(`💘 Here is your book:`);
        await ctx.replyWithDocument({ source: fs.createReadStream(fileLocal), filename: `${book.title} - ${book.author}.pdf` }, menuHome);

        // delete file when was send
        fs.unlinkSync(fileLocal);
    } catch (error) {
        log(error)
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
