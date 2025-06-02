const { logs } = require("../functions/utils");
const braker = require("./braker");
const downloadBook = require("./downloadBook");
const downloadMusicYoutube = require("./downloadMusicYoutube");
const downloadTiktokAudio = require("./downloadTiktokAudio");
const start = require("./start");

function setupBot(bot) {

    // Command /start
    bot.start(start);
    logs({ text: "Bot stared" })

    bot.action("DOWNLOAD_YOUTUBE_MUSIC", downloadMusicYoutube);
    bot.action("DOWNLOAD_TIKTOK_AUDIO", downloadTiktokAudio);
    bot.action("DOWNLOAD_BOOKS", downloadBook);
    // bot.on('callback_query', handleVip);
    
    // commands
    bot.on('text', braker);
}

module.exports = { setupBot };