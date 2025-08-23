require('dotenv').config();

module.exports = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  OWNER_ID: Number(process.env.OWNER_ID || 0),
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  PORT: process.env.PORT || 3000,
};
