const puppeteer = require('puppeteer');
const { logs, isTiktokValidURL } = require('./utils');
const { menuHome } = require('../resources/menus');

module.exports = async function (ctx) {

    try {
        const input = ctx.message.text;

        let isValidURL = isTiktokValidURL(input);
        if (!isValidURL) return ctx.reply(`😣 Send a valid URL.`);

        logs({ text: `user need music tiktok URL: ${input}` });

        ctx.reply(`⏰ Hold on, we are downloading your audio:`);

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // go page
        await page.goto('https://tiktokio.com/es/tik-tok-mp3/', { waitUntil: 'networkidle2' });

        // write URL Video Music
        await page.type('input[id="tiktok-url-input"]', input);

        // submit form
        await page.click('button[id="search-btn"]');

        // wait response
        await page.waitForSelector('.tk-down-link a');

        // link audio
        const downloadMp3Link = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.tk-down-link a'));
            const mp3Link = links.find(link => link.textContent.trim().toLowerCase() === 'download mp3');
            return mp3Link ? mp3Link.href : null;
        });

        if(!downloadMp3Link) return ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);

        // close
        await browser.close();

        logs({ text: `sending audio URL: ${input}` });

        ctx.reply(`🎵 Here you have the audio to download:`);
        await ctx.replyWithAudio({ url: downloadMp3Link, filename: 'musicAudioTiktok.mp3' }, menuHome);
    } catch (error) {
        log(error);
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
