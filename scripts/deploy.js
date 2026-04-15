import '../bootstrap.js';

import { GatewayIntentBits } from 'discord.js';

import Bot from '../src/core/Bot.js';

const client = new Bot({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

async function loadClient() {
  await client.loadAll();
  await client.loadClient(process.env.TOKEN);
  await client.deployClientCommands();
  await client.destroy();
}

loadClient();
