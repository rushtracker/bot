import Event from '../../core/structures/Event.js';

export default class HandlerButtonEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:button'
    });
  }

  async run(interaction, button) {
    if ((interaction.message.interactionMetadata?.user?.id || interaction.user.id) !== interaction.user.id) return;

    try {
      await button.run(interaction);
    } catch(error) {
      this.errorReply(interaction);
      this.client.emit('error:interaction', error);
    }
  }
}
