import { GatewayIntentBits } from 'discord.js';

import Bot from './core/Bot.js';

const client = new Bot({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

async function loadClient() {
  await client.loadAll();
  await client.loadClient(process.env.TOKEN);
}

loadClient();
