const downloadBook = require("../functions/downloadBook");
const downloadMp3 = require("../functions/downloadMp3");
const downloadMp3Tiktok = require("../functions/downloadMp3Tiktok");
const { menuHome } = require("../resources/menus");

module.exports = async function (ctx) {
    if (!ctx.session) ctx.session = {};
    const type = ctx.session?.downloadType;

    if (!type) {
        return ctx.reply("❓ Please choose what you want to download first.", menuHome);
    }

    if (type === "downloadMusicYoutube") {
        return downloadMp3(ctx);
    }

    if (type === "downloadTiktokAudio") {
        return downloadMp3Tiktok(ctx);
    }

    if (type === "downloadBook") {
        return downloadBook(ctx);
    }

};