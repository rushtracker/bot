import './bootstrap.js';

import { ShardingManager } from 'discord.js';

const manager = new ShardingManager('./src/client.js', {
  token: process.env.TOKEN,
  totalShards: 'auto'
});

manager.on('shardCreate', (shard) => {

});

manager.spawn();
