const puppeteer = require('puppeteer');
const { logs, isYoutubeURL } = require('./utils');
const { menuHome } = require('../resources/menus');

module.exports = async function (ctx) {

    try {
        const input = ctx.message.text;

        let isValidURL = isYoutubeURL(input);
        if (!isValidURL) return ctx.reply(`😣 Send a valid URL.`);

        logs({ text: `user need music youtube URL: ${input}` });

        ctx.reply(`⏰ Hold on, we are downloading your audio:`);

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // go page
        await page.goto('https://y2mate.nu/en-00uN/', { waitUntil: 'networkidle2' });

        // write URL Video Music
        await page.type('input[name="v"]', input);

        // submit form
        await page.click('button[type="submit"]');

        // wait response
        await page.waitForSelector('div[style*="justify-content: center"]');

        // intercep network
        const downloadUrlPromise = new Promise((resolve) => {
            page.on('response', async (response) => {
                const url = response.url();
                // filter URL audio
                if (
                    url.startsWith('https://mmmu.mnuu.nu/api/v1/download') &&
                    url.includes('f=mp3')
                ) {
                    resolve(url);
                }
            });
        });

        // click download
        await page.evaluate(() => {
            // search button download
            const div = document.querySelector('div[style*="justify-content: center"]');
            if (div) {
                const btnDownload = [...div.querySelectorAll('button')].find(b => b.textContent.trim() === 'Download');
                if (btnDownload) btnDownload.click();
            }
        });

        // wait for URL sound
        const audioUrl = await downloadUrlPromise;

        // close
        await browser.close();

        logs({ text: `sending audio URL: ${input}` });

        ctx.reply(`🎵 Here you have the audio to download:`);
        await ctx.replyWithAudio({ url: audioUrl, filename: 'musicAudioYt.mp3' }, menuHome);
    } catch (error) {
        log(error)
        ctx.reply(`😣 Something went wrong, try again in a few minutes.`, menuHome);
    }
};
