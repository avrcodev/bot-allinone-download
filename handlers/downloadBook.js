module.exports = async function (ctx) {
    ctx.answerCbQuery();
    if (!ctx.session) ctx.session = {};
    // save session
    ctx.session.downloadType = "downloadBook";
    ctx.reply("📚 Please send me the name of the book.");
};