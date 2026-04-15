import Event from '../../core/structures/Event.js';

export default class HandlerModalEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:modal'
    });
  }

  async run(interaction, modal) {
    try {
      await modal.run(interaction);
    } catch(error) {
      this.errorReply(interaction);
      this.client.emit('error:interaction', error);
    }
  }
}
