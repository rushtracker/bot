import Event from '../../core/structures/Event.js';

export default class HandlerSelectMenuEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:selectmenu'
    });
  }

  async run(interaction, selectmenu) {
    if ((interaction.message.interactionMetadata?.user?.id || interaction.user.id) !== interaction.user.id) return;

    try {
      await selectmenu.run(interaction);
    } catch(error) {
      this.errorReply(interaction);
      this.client.emit('error:interaction', error);
    }
  }
}
