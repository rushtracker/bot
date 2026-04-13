import { Colors, MessageFlags } from 'discord.js';

import Event from '../../core/structures/Event.js';
import Container from '../../services/Container.js';

export default class HandlerCommand extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:command'
    });
  }

  async run(interaction, command) {
    try {
      await command.run(interaction);
    } catch(error) {
      interaction.reply({
        flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
        components: [
          new Container()
          .setAccentColor(Colors.Red)
          .h3('erreur')
          .text('une erreur est survenue')
        ]
      });

      this.client.emit('error:interaction', error);
    }
  }
}
