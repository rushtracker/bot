require('./bootstrap');

const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./src/client.js', {
  token: process.env.TOKEN,
  totalShards: 'auto'
});

manager.on('shardCreate', (shard) => {

});

manager.spawn();