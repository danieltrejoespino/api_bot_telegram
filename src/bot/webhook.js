const crypto = require('crypto');
// const { WEBHOOK_URL } = require('../config/env');
const bot = require('./index');

// const secretPath = `/telegraf/${crypto.randomBytes(16).toString('hex')}`;
// const webhookUrl = `${WEBHOOK_URL}${secretPath}`;

function setupWebhook(app,baseUrl) {
const secretPath = `/telegraf/${crypto.randomBytes(16).toString('hex')}`;
  const webhookUrl = `${baseUrl}${secretPath}`;

  app.post(secretPath, (req, res) => {
    return bot.handleUpdate(req.body, res);
  });

  return { webhookUrl };
}

module.exports = setupWebhook;
