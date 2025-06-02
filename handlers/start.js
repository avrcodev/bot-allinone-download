const { menuHome } = require("../resources/menus");
const { msgHome, errorMsg } = require("../resources/msgs");

module.exports = async function (ctx) {
    let msg, menu;
    try {
        const userId = ctx.from.id;
        const nameUser = ctx.message.from.first_name;
    
        msg = msgHome.replace("{nameUser}", nameUser);
        menu = menuHome;
    
        log(`---------------------------------------------------------------------`);
        log(`<<---- New user start bot ---->>`);
        log(`userId: ${userId} nameUser: ${nameUser}`);
        log(`---------------------------------------------------------------------`);
    
        ctx.reply(msg, menu);
    } catch (error) {
        ctx.reply(errorMsg);
    }
};