import Event from '../../core/structures/Event.js';

export default class HandlerAutocompleteEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:autocomplete'
    });
  }

  async run(interaction, command) {
    try {
      await command.autocomplete(interaction);
    } catch(error) {
      this.client.emit('error:interaction', error);
    }
  }
}
