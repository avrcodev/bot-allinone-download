const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = fns = {
    logs({ text }) {
        console.log(`---------------------------------------------------------------------`);
        console.log(`<<---- ${text} ---->>`);
        console.log(`---------------------------------------------------------------------`);
    },
    async pdfGetPuppeter(urlPdf, pathDownload) {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(urlPdf, { waitUntil: 'networkidle2' });

        const pdfBuffer = await page.evaluate(async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return Array.from(new Uint8Array(arrayBuffer));
        }, urlPdf);

        // convert array of bytes in buffer
        const buffer = Buffer.from(pdfBuffer);

        const fileNamed = 'file.pdf';

        // Ruta completa donde guardar
        const pathComplete = path.join(pathDownload, fileNamed);

        // Guarda el archivo localmente
        fs.writeFileSync(pathComplete, buffer);

        await browser.close();

        return pathComplete;
    },
    esperarArchivoPdf(carpeta, timeout = 10000) {
        return new Promise((resolve) => {
            const tiempoInicio = Date.now();

            const interval = setInterval(() => {
                const archivos = fs.readdirSync(carpeta);
                const pdfs = archivos.filter(f => f.endsWith('.pdf'));

                if (pdfs.length > 0) {
                    clearInterval(interval);
                    resolve(pdfs[0]);
                } else if (Date.now() - tiempoInicio > timeout) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, 500);
        });
    },
    isYoutubeURL(url) {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return regex.test(url);
    },
    isTiktokValidURL(url) {
        const regex = /^https?:\/\/(www\.tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/[\w/-]+)\/?$/i;
        return regex.test(url);
    }
}
