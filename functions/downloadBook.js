const puppeteer = require('puppeteer');
const { logs } = require('./utils');
const { menuHome } = require('../resources/menus');
const bookPageDownload = require('./books/bookPageDownload');

module.exports = async function (ctx) {

    try {
        const input = ctx.message.text;
        if(!input) return ctx.reply(`😣 so...`, menuHome);

        if(input){
            let letters = input.split("");
            if(letters.length > 200){
                return ctx.reply(`👉 Don't write so much my king`, menuHome);
            } 
        }
        logs({ text: `user need book Named: ${input}` });

        ctx.reply(`⏰ Wait, we are looking for your book.`);

        const encodedQuery = encodeURIComponent(input);
        const url = `https://ww3.lectulandia.com/search/${encodedQuery.replace(/%20/g, '+')}`;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // go page
        await page.goto(url, { waitUntil: 'networkidle2' });

        // wait response
        await page.waitForSelector('article.card');

        // read books results
        const books = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('article.card')).map(card => ({
                title: card.querySelector('h2 a')?.innerText.trim(),
                author: card.querySelector('.subdetail a')?.innerText.trim(),
                link: card.querySelector('a.card-click-target')?.href,
                img: card.querySelector('img.cover')?.src,
            }));
        });

        if(books.length > 0){
            // first book to download
            let libroToDownload = books[0];
            bookPageDownload(ctx, libroToDownload);
        } else {
            ctx.reply(`🥵 We couldn't find your book, try to write it differently or remove the author.`, menuHome);
        }

        await browser.close();
    } catch (error) {
        log(error)
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
