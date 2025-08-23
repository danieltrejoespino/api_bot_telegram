const express = require('express');
const bot = require('./src/bot');
const setupWebhook = require('./src/bot/webhook');
const { PORT } = require('./src/config/env');
const ngrok = require('ngrok');

const app = express();
app.use(express.json());

(async function() {
  // Levantas el servidor Express
  const server = app.listen(PORT, async () => {
    console.log(`Servidor en http://localhost:${PORT}`);

    // 🚀 Abre un túnel con ngrok
    const url = await ngrok.connect(PORT);
    console.log(`ngrok URL: ${url}`);

    // Configurar webhook con la URL dinámica de ngrok
    const { webhookUrl } = setupWebhook(app, url);

    try {
      await bot.telegram.setWebhook(webhookUrl);
      console.log(`Webhook registrado en: ${webhookUrl}`);

      const webhookInfo = await bot.telegram.getWebhookInfo();
      console.log('Webhook info:', webhookInfo);
    } catch (error) {
      console.error('Error al configurar el webhook:', error);
    }
  });
})();
