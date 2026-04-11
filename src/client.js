const { GatewayIntentBits } = require('discord.js');

const Bot = require('./core/Bot.js');

const client = new Bot({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

async function loadClient() {
  
}