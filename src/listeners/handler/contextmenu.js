import Event from '../../core/structures/Event.js';

export default class HanderContextMenuEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'handler:contextmenu'
    });
  }

  async run(interaction, contextmenu) {
    try {
      await contextmenu.run(interaction);
    } catch(error) {
      this.errorReply(interaction);
      this.client.emit('error:interaction', error);
    }
  }
}
