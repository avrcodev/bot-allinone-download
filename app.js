require('dotenv').config();

const { Telegraf, session } = require('telegraf');
const { setupBot } = require('./handlers/bot');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(session());
setupBot(bot);

bot.launch();