module.exports = async function (ctx) {
    ctx.answerCbQuery();
    if (!ctx.session) ctx.session = {};
    // save session
    ctx.session.downloadType = "downloadMusicYoutube";
    ctx.reply("🎵 Please send me the YouTube URL of the song.");
};