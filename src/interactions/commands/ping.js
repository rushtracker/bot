import { MessageFlags } from 'discord.js';
import Command from '../../core/structures/Command.js';
import Container, { fmt } from '../../services/Container.js';

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'obtenir la latence du bot',
      category: 'information'
    });
  }

  async run(interaction) {
    interaction.reply({
      flags: [MessageFlags.IsComponentsV2],
      components: [
        new Container()
        .h3('latence')
        .text(`${fmt.bold('discord:')} ${this.client.ws.ping < 0 ? 'latence indisponible' : `${this.client.ws.ping}ms`}`)
      ]
    });
  }
}
