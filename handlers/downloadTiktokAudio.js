module.exports = async function (ctx) {
    ctx.answerCbQuery();
    if (!ctx.session) ctx.session = {};
    // save session
    ctx.session.downloadType = "downloadTiktokAudio";
    ctx.reply("🎵 Please send me the Tiktok URL Video.");
};