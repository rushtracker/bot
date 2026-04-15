import Event from '../../core/structures/Event.js';

export default class HandlerCommandEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:command'
    });
  }

  async run(interaction, command) {
    try {
      await command.run(interaction);
    } catch(error) {
      this.errorReply(interaction);
      this.client.emit('error:interaction', error);
    }
  }
}
