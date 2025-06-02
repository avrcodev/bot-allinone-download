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
        await page.goto('https://ssstik.io/es/download-tiktok-mp3', { waitUntil: 'networkidle2' });

        // write URL Video Music
        await page.type('input[id="main_page_text"]', input);

        // submit form
        await page.click('button[type="submit"]');

        // wait response
        await page.waitForSelector('a.download_link.music', { timeout: 30000 });

        // link audio
        const linkAudio = await page.$eval('a.download_link.music', el => el.href);

        // close
        await browser.close();

        logs({ text: `sending audio URL: ${input}` });

        ctx.reply(`🎵 Here you have the audio to download:`);
        await ctx.replyWithAudio({ url: linkAudio, filename: 'musicAudioTiktok.mp3' }, menuHome);
    } catch (error) {
        log(error);
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
