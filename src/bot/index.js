const { Telegraf } = require('telegraf');
const { TELEGRAM_BOT_TOKEN, OWNER_ID } = require('../config/env');
const registerCommands = require('./commands');

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Registrar comandos y escuchas
registerCommands(bot, OWNER_ID);

module.exports = bot;
