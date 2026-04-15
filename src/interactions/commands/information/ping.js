import { HeadingLevel } from 'discord.js';

import Command from '../../../core/structures/Command.js';
import Container from '../../../services/Container.js';

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'obtenir la latence du bot',
      category: 'information'
    });
  }

  async run(interaction) {
    this.safeReply(interaction, {
      components: [
        new Container()
        .addText(this.client.ws.ping < 0 ? 'latence indisponible' : `${this.client.ws.ping}ms`)
      ]
    });
  }
}
