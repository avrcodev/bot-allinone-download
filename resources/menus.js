const { Markup } = require('telegraf');

let menuHome = Markup.inlineKeyboard([
  [Markup.button.callback("📚 Download Books", "DOWNLOAD_BOOKS")],
  [Markup.button.callback("🎵 Download YouTube Music", "DOWNLOAD_YOUTUBE_MUSIC")],
  [Markup.button.callback("🎬 Download TikTok Audio", "DOWNLOAD_TIKTOK_AUDIO")]
]);

module.exports = {
    menuHome
}