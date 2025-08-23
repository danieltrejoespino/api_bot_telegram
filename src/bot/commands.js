const { json } = require('express');
const animeActions = require('../models/modelAnime');
const { Markup } = require('telegraf');

function registerCommands(bot, OWNER_ID) {
  // Comandos básicos

  bot.hears(/hola/i, (ctx) => {
    const username = ctx.from.first_name || 'desconocido';
    return ctx.reply(
      `¡Hola! ${username} 😊 Elige una opción:`,
      Markup.keyboard([
        ['ANIME']
      ])
        .resize()
    );
  });

  bot.hears(/menu/i, (ctx) => {
    const username = ctx.from.first_name || 'desconocido';
    return ctx.reply(
      `Hola ${username}, seleciona una opción:`,
      Markup.inlineKeyboard([        
        [Markup.button.callback('🎬 Anime del día', 'ANIME')],
        [Markup.button.callback('Status api anime', 'API_ANIME')],
      ])
    );
  });

    // 👉 Evento cuando presiona el botón Inline
  bot.action('API_ANIME', async (ctx) => {
    await ctx.answerCbQuery(); 
    await testApiAnime(ctx);
  });

  // 👉 Evento cuando presiona el botón Inline
  bot.action('ANIME', async (ctx) => {
    await ctx.answerCbQuery(); 
    await showAnime(ctx);
  });

  // 👉 Evento cuando escribe "anime"
  bot.hears(/anime/i, async (ctx) => {
    await showAnime(ctx);
  });


  // Otros mensajes
  bot.on('text', (ctx) => {
    if (OWNER_ID && ctx.from.id !== OWNER_ID) return;
    ctx.reply(`No entiendo ese mensaje. Prueba con /menu o /help`);
  });
}




// 👉 Lógica común para mostrar los animes
async function showAnime(ctx) {
  const username = ctx.from.first_name || 'desconocido';
  await ctx.reply(`Hola ${username}, aquí tienes los animes del día:`);

  try {
    const data = await animeActions.getListAnime();
    for (const element of data) {
      await ctx.reply(`${element.title}\nEpisodio: ${element.capi}`);
      await ctx.replyWithPhoto(element.Image);
    }
  } catch (error) {
    console.error('Error al enviar la imagen:', error);
    await ctx.reply('Lo siento, no pude cargar la lista de animes 😢');
  }
}


const testApiAnime = async (ctx) => {
    try {
    const {message} = await animeActions.healtAPi();
    await ctx.reply('API Anime está funcionando correctamente. ✅');
    await ctx.reply(message);
  } catch (error) {
    console.error('Error al enviar la imagen:', error);
    await ctx.reply('Lo siento, no pude cargar la lista de animes 😢');
  }
}

module.exports = registerCommands;
