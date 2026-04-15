import { Colors, HeadingLevel, MessageFlags } from 'discord.js';

import Container from '../../services/Container.js';

export default class Base {
  constructor(client) {
    this.client = client;
  }

  async safeReply(interaction, options) {
    const flags = new Set([
      MessageFlags.IsComponentsV2,
      ...(options.flags || [])
    ]);
    
    const opts = {
      ...options,
      flags: [...flags]
    };
    
    try {
      if (interaction.deferred) return await interaction.editReply(opts);
      if (interaction.replied) return await interaction.followUp(opts);

      return await interaction.reply(opts);
    } catch(error) {
      console.log(error);
    }
  }

  async errorReply(interaction, message = 'une erreur est survenue') {
    return await this.safeReply(interaction, {
      flags: [MessageFlags.Ephemeral],
      components: [
        new Container()
        .setColor(Colors.Red)
        .addHeading(HeadingLevel.Three, 'erreur')
        .addText(message)
      ]
    });
  }

  run() {}
}
